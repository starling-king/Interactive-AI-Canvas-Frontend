import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
    MiniMap,
    ConnectionMode,
    MarkerType,
    useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useCanvasStore } from '../store/canvasStore.js';
import { useCanvasActions } from '../hooks/useCanvasActions.js';

import {
    SkeletonLoader,
    customNodeTypes,
    customEdgeTypes,
    ActionToolbar,
    CanvasHeader,
    AiPromptModal,
    VersionSidebar,
    NodeInspector,
    ArsenalPanel
} from '../components/index.js';

// ============================================================================
// CORE ENGINE: CanvasContent 
// Responsibility: Managing the interactive graph and user inputs.
// ============================================================================
function CanvasContent({ workspaceId }) {
    // 1. GLOBAL MEMORY (Zustand)
    const {
        nodes, edges, onNodesChange, onEdgesChange, onConnect,
        addNode, deleteSelectedElements, undo, redo, takeSnapshot
    } = useCanvasStore();

    const { screenToFlowPosition } = useReactFlow();

    // 2. LOCAL UI STATE (Modals & Inspectors)
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isTimeMachineOpen, setIsTimeMachineOpen] = useState(false);
    const [activeNode, setActiveNode] = useState(null);

    // ============================================================================
    // BEHAVIOR: Keyboard Shortcuts (Undo, Redo, Delete)
    // ============================================================================
    useEffect(() => {
        const handleKeyboardCommands = (event) => {
            const activeElement = document.activeElement;
            const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement?.tagName) || activeElement?.isContentEditable;

            // Guard: If the user is typing a node label or math formula, don't trigger shortcuts
            if (isTyping) return;

            const isMacCmd = event.metaKey;
            const isWinCtrl = event.ctrlKey;
            const isModifierActive = isMacCmd || isWinCtrl;

            if (isModifierActive && event.key.toLowerCase() === 'z' && !event.shiftKey) {
                event.preventDefault();
                undo();
            } else if (
                (isModifierActive && event.key.toLowerCase() === 'y') ||
                (isModifierActive && event.shiftKey && event.key.toLowerCase() === 'z')
            ) {
                event.preventDefault();
                redo();
            } else if (event.key === 'Backspace' || event.key === 'Delete') {
                event.preventDefault();
                deleteSelectedElements();
                setActiveNode(null); // Close the inspector if the node is destroyed
            }
        };

        window.addEventListener('keydown', handleKeyboardCommands);
        return () => window.removeEventListener('keydown', handleKeyboardCommands);
    }, [deleteSelectedElements, undo, redo]);

    // ============================================================================
    // BEHAVIOR: Clicks & Interactions
    // ============================================================================
    const handleNodeDoubleClick = useCallback((event, node) => {
        setActiveNode(node);
    }, []);

    const handleCanvasClick = useCallback(() => {
        setActiveNode(null); // Click the background void to close the inspector
    }, []);

    // ============================================================================
    // BEHAVIOR: Drag, Drop, and Add Nodes
    // ============================================================================
    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();

        const nodeType = event.dataTransfer.getData('application/reactflow/type');
        const rawNodeData = event.dataTransfer.getData('application/reactflow/data');

        if (!nodeType) return;

        // Defensive parsing: Never trust external drop data blindly
        let parsedData = {};
        try {
            parsedData = rawNodeData ? JSON.parse(rawNodeData) : {};
        } catch (error) {
            console.error("Failed to parse dropped node data:", error);
        }

        const dropPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        takeSnapshot(); // Save history for Ctrl+Z
        addNode({
            id: `manual_${Date.now()}`,
            type: nodeType,
            position: dropPosition,
            data: parsedData,
        });
    }, [screenToFlowPosition, addNode, takeSnapshot]);

    const handleAddNodeFromPanel = useCallback((nodeType, nodeData) => {
        const centerPosition = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        takeSnapshot();
        addNode({
            id: `manual_${Date.now()}`,
            type: nodeType,
            position: centerPosition,
            data: nodeData || {},
        });
    }, [screenToFlowPosition, addNode, takeSnapshot]);

    // ============================================================================
    // BEHAVIOR: Wire Connections (The Arrowhead Fix)
    // ============================================================================
    const handleNewConnection = useCallback((connection) => {
        // We construct the perfect edge payload BEFORE sending it to the database
        const fullyFormedEdge = {
            ...connection,
            type: 'edge_orthogonal', // Standardize to 90-degree routing
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#94a3b8' // Default slate color
            }
        };

        takeSnapshot();
        onConnect(fullyFormedEdge); // Push perfectly formatted edge to global store
    }, [onConnect, takeSnapshot]);

    // ============================================================================
    // RENDER: Layout & Organization
    // ============================================================================
    return (
        <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

            {/* LAYER 3: Modal Overlays (Highest Z-Index) */}
            <AiPromptModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} workspaceId={workspaceId} />
            <VersionSidebar isOpen={isTimeMachineOpen} onClose={() => setIsTimeMachineOpen(false)} workspaceId={workspaceId} />

            {/* LAYER 2: Floating UI Elements */}
            <CanvasHeader workspaceId={workspaceId} onOpenHistory={() => setIsTimeMachineOpen(true)} />
            <ActionToolbar workspaceId={workspaceId} onOpenAiModal={() => setIsAiModalOpen(true)} />
            <ArsenalPanel onAddNode={handleAddNodeFromPanel} />
            <NodeInspector selectedNode={activeNode} onClose={() => setActiveNode(null)} />

            {/* LAYER 1: The React Flow Engine */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={handleNewConnection}             // Crucial: Uses our formatted interceptor
                onNodeDoubleClick={handleNodeDoubleClick}
                onPaneClick={handleCanvasClick}
                onNodeDragStart={() => takeSnapshot()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                nodeTypes={customNodeTypes}
                edgeTypes={customEdgeTypes}
                connectionMode={ConnectionMode.Strict}      // Crucial: Blocks reverse-routing bugs
                fitView
                minZoom={0.1}
                maxZoom={2}
                className="touch-none z-0"
            >
                <Background color="#334155" gap={24} size={2} />
                <Controls
                    position="bottom-left"
                    className="bg-moon-900 border-moon-800 fill-slate-300 shadow-xl rounded-lg overflow-hidden"
                    style={{ marginBottom: '2rem', marginLeft: '6rem' }}
                />
                <MiniMap
                    position="bottom-right"
                    nodeColor="#1e293b"
                    maskColor="rgba(4, 4, 5, 0.7)"
                    className="bg-moon-900 border border-moon-800 rounded-xl shadow-2xl"
                    style={{ marginBottom: '2rem', marginRight: '1.5rem' }}
                />
            </ReactFlow>
        </div>
    );
}

// ============================================================================
// DATA WRAPPER: CanvasWorkspace
// Responsibility: Fetching data and mounting the ReactFlow Provider context.
// ============================================================================
export default function CanvasWorkspace() {
    const { workspaceId } = useParams();
    const { fetchCanvas } = useCanvasActions();
    const { isFetching } = useCanvasStore();

    // Circuit Breaker: Prevents infinite fetch loops if component re-renders
    const lastWorkspaceId = useRef(null);

    useEffect(() => {
        if (workspaceId && lastWorkspaceId.current !== workspaceId) {
            lastWorkspaceId.current = workspaceId;
            fetchCanvas(workspaceId);
        }
    }, [workspaceId, fetchCanvas]);

    // Safety Gate: Do not render the complex engine until the database payload arrives
    if (isFetching) {
        return (
            <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
                <SkeletonLoader type="canvas" />
            </div>
        );
    }

    return (
        <ReactFlowProvider>
            <CanvasContent workspaceId={workspaceId} />
        </ReactFlowProvider>
    );
}