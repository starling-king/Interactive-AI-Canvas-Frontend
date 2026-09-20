// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     ReactFlow,
//     ReactFlowProvider,
//     Background,
//     Controls,
//     MiniMap,
//     ConnectionMode,
//     MarkerType
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// import { useCanvasStore } from '../store/canvasStore.js';
// import { useCanvasActions } from '../hooks/useCanvasActions.js';

// import {
//     SkeletonLoader,
//     customNodeTypes,
//     customEdgeTypes,
//     ActionToolbar,
//     CanvasHeader,
//     AiPromptModal,
//     VersionSidebar,
//     NodeInspector,
//     ArsenalPanel
// } from '../components/index.js';

// export default function CanvasWorkspace() {
//     const { workspaceId } = useParams();
//     const { fetchCanvas } = useCanvasActions();

//     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, deleteSelectedElements } = useCanvasStore();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//     const [selectedNode, setSelectedNode] = useState(null);

//     const [reactFlowInstance, setReactFlowInstance] = useState(null);
//     const reactFlowWrapper = useRef(null);

//     useEffect(() => {
//         if (workspaceId) {
//             fetchCanvas(workspaceId);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [workspaceId]);

//     // --- KEYBOARD LISTENER FOR DELETION ---
//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             // Check if user pressed Backspace or Delete, and isn't typing in an input field
//             if (
//                 (event.key === 'Backspace' || event.key === 'Delete') &&
//                 ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(document.activeElement.tagName) === -1
//             ) {
//                 event.preventDefault();
//                 deleteSelectedElements();
//                 setSelectedNode(null); // Close inspector if a selected node was deleted
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [deleteSelectedElements]);
//     // --------------------------------------

//     const handleSelectionChange = useCallback(({ nodes }) => {
//         if (nodes.length === 1) {
//             setSelectedNode(nodes[0]);
//         } else {
//             setSelectedNode(null);
//         }
//     }, []);

//     const onDragOver = useCallback((event) => {
//         event.preventDefault();
//         event.dataTransfer.dropEffect = 'move';
//     }, []);

//     const onDrop = useCallback((event) => {
//         event.preventDefault();

//         if (!reactFlowInstance) return;

//         const type = event.dataTransfer.getData('application/reactflow/type');
//         const defaultDataString = event.dataTransfer.getData('application/reactflow/data');

//         if (!type) return;

//         const position = reactFlowInstance.screenToFlowPosition({
//             x: event.clientX,
//             y: event.clientY,
//         });

//         const newNode = {
//             id: `manual_${Date.now()}`,
//             type,
//             position,
//             data: JSON.parse(defaultDataString),
//         };

//         addNode(newNode);
//     }, [reactFlowInstance, addNode]);

//     const defaultEdgeOptions = {
//         type: 'edge_orthogonal',
//         markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#3b82f6' },
//     };

//     if (isFetching) {
//         return (
//             <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
//                 <SkeletonLoader type="canvas" />
//             </div>
//         );
//     }

//     return (
//         <ReactFlowProvider>
//             <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden" ref={reactFlowWrapper}>
//                 <CanvasHeader workspaceId={workspaceId} onOpenHistory={() => setIsHistoryOpen(true)} />
//                 <ActionToolbar workspaceId={workspaceId} onOpenAiModal={() => setIsModalOpen(true)} />
//                 <AiPromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} workspaceId={workspaceId} />
//                 <VersionSidebar isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} workspaceId={workspaceId} />
//                 <NodeInspector selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />
//                 <ArsenalPanel />

//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     onSelectionChange={handleSelectionChange}
//                     onInit={setReactFlowInstance}
//                     onDrop={onDrop}
//                     onDragOver={onDragOver}
//                     nodeTypes={customNodeTypes}
//                     edgeTypes={customEdgeTypes}
//                     defaultEdgeOptions={defaultEdgeOptions}
//                     connectionMode={ConnectionMode.Loose}
//                     fitView
//                     minZoom={0.1}
//                     maxZoom={2}
//                     className="touch-none"
//                 >
//                     <Background color="#262626" gap={24} size={2} />
//                     <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />
//                     <MiniMap nodeColor="#262626" maskColor="rgba(10, 10, 10, 0.8)" className="bg-moon-950" />
//                 </ReactFlow>
//             </div>
//         </ReactFlowProvider>
//     );
// }

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

function CanvasContent({ workspaceId }) {
    // Injecting Undo, Redo, and takeSnapshot
    const {
        isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect,
        addNode, deleteSelectedElements, undo, redo, takeSnapshot
    } = useCanvasStore();

    const { screenToFlowPosition } = useReactFlow();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    // --- KEYBOARD SHORTCUTS LISTENER ---
    useEffect(() => {
        const handleKeyDown = (event) => {
            const isTypingInInput = ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(document.activeElement?.tagName) !== -1;

            if (isTypingInInput) return; // Ignore shortcuts if typing text

            // Undo: Ctrl+Z or Cmd+Z
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
                event.preventDefault();
                undo();
            }
            // Redo: Ctrl+Y, Cmd+Y, or Cmd+Shift+Z
            else if (
                ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') ||
                ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'z')
            ) {
                event.preventDefault();
                redo();
            }
            // Delete: Backspace or Delete
            else if (event.key === 'Backspace' || event.key === 'Delete') {
                event.preventDefault();
                deleteSelectedElements();
                setSelectedNode(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteSelectedElements, undo, redo]);
    // -----------------------------------

    const handleSelectionChange = useCallback(({ nodes }) => {
        if (nodes.length === 1) {
            setSelectedNode(nodes[0]);
        } else {
            setSelectedNode(null);
        }
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow/type');
        const defaultDataString = event.dataTransfer.getData('application/reactflow/data');

        if (!type) return;

        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        const newNode = {
            id: `manual_${Date.now()}`,
            type,
            position,
            data: JSON.parse(defaultDataString),
        };

        addNode(newNode);
    }, [screenToFlowPosition, addNode]);

    const defaultEdgeOptions = {
        type: 'edge_orthogonal',
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#3b82f6' },
    };

    return (
        <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">
            <CanvasHeader workspaceId={workspaceId} onOpenHistory={() => setIsHistoryOpen(true)} />
            <ActionToolbar workspaceId={workspaceId} onOpenAiModal={() => setIsModalOpen(true)} />
            <AiPromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} workspaceId={workspaceId} />
            <VersionSidebar isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} workspaceId={workspaceId} />

            <NodeInspector selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />
            <ArsenalPanel />

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onSelectionChange={handleSelectionChange}
                onNodeDragStart={takeSnapshot} // Take a snapshot right before a drag begins
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={customNodeTypes}
                edgeTypes={customEdgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionMode={ConnectionMode.Loose}
                fitView
                minZoom={0.1}
                maxZoom={2}
                className="touch-none"
            >
                <Background color="#262626" gap={24} size={2} />
                <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />
                <MiniMap nodeColor="#262626" maskColor="rgba(10, 10, 10, 0.8)" className="bg-moon-950" />
            </ReactFlow>
        </div>
    );
}

export default function CanvasWorkspace() {
    const { workspaceId } = useParams();
    const { fetchCanvas } = useCanvasActions();
    const { isFetching } = useCanvasStore();

    useEffect(() => {
        if (workspaceId) {
            fetchCanvas(workspaceId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspaceId]);

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