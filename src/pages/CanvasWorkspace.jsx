// // // // // import React, { useEffect } from 'react';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import {
// // // // //     ReactFlow,
// // // // //     ReactFlowProvider,
// // // // //     Background,
// // // // //     Controls,
// // // // //     MiniMap,
// // // // //     ConnectionMode,
// // // // //     MarkerType
// // // // // } from '@xyflow/react';
// // // // // import '@xyflow/react/dist/style.css';

// // // // // // 1. Zustand Brain & Actions
// // // // // import { useCanvasStore } from '../store/canvasStore.js';
// // // // // import { useCanvasActions } from '../hooks/useCanvasActions.js';

// // // // // // 2. UI & Dictionaries (Imported cleanly from your Soul Index file)
// // // // // import { SkeletonLoader, customNodeTypes, customEdgeTypes } from '../components/index.js';

// // // // // export default function CanvasWorkspace() {
// // // // //     // 3. Extract the ID from the URL (Deep Linking)
// // // // //     const { workspaceId } = useParams();

// // // // //     // 4. Get the network action
// // // // //     const { fetchCanvas } = useCanvasActions();

// // // // //     // 5. Connect to the Live State
// // // // //     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

// // // // //     // 6. Deep Hydration: Trigger download the second this page mounts
// // // // //     useEffect(() => {
// // // // //         if (workspaceId) {
// // // // //             fetchCanvas(workspaceId);
// // // // //         }
// // // // //         // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //     }, [workspaceId]);

// // // // //     const defaultEdgeOptions = {
// // // // //         type: 'edge_orthogonal',
// // // // //         markerEnd: {
// // // // //             type: MarkerType.ArrowClosed,
// // // // //             width: 20,
// // // // //             height: 20,
// // // // //             color: '#3b82f6', // Electric Blue arrows for the dark theme
// // // // //         },
// // // // //     };

// // // // //     // 7. The Loading Block: Show your Skeleton Loader while fetching from the DB
// // // // //     if (isFetching) {
// // // // //         return (
// // // // //             <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
// // // // //                 <SkeletonLoader type="canvas" />
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     // 8. The Kinetic Render: The data has arrived!
// // // // //     return (
// // // // //         <ReactFlowProvider>
// // // // //             {/* The Void Background from your index.css SSOT */}
// // // // //             <div className="w-screen h-screen bg-moon-950 font-sans">
// // // // //                 <ReactFlow
// // // // //                     nodes={nodes}
// // // // //                     edges={edges}
// // // // //                     onNodesChange={onNodesChange}
// // // // //                     onEdgesChange={onEdgesChange}
// // // // //                     onConnect={onConnect}
// // // // //                     nodeTypes={customNodeTypes}
// // // // //                     edgeTypes={customEdgeTypes}
// // // // //                     defaultEdgeOptions={defaultEdgeOptions}
// // // // //                     connectionMode={ConnectionMode.Loose}
// // // // //                     fitView
// // // // //                     minZoom={0.1}
// // // // //                     maxZoom={2}
// // // // //                     className="touch-none"
// // // // //                 >
// // // // //                     {/* The dark dotted background */}
// // // // //                     <Background color="#262626" gap={24} size={2} /> {/* moon-800 */}

// // // // //                     {/* Standard navigation controls */}
// // // // //                     <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />

// // // // //                     <MiniMap
// // // // //                         nodeColor="#262626"
// // // // //                         maskColor="rgba(10, 10, 10, 0.8)"
// // // // //                         className="bg-moon-950"
// // // // //                     />

// // // // //                     {/* STEP 3 PLACEMENT: We will layer the CanvasHeader and ActionToolbar here next! */}

// // // // //                 </ReactFlow>
// // // // //             </div>
// // // // //         </ReactFlowProvider>
// // // // //     );
// // // // // }

// // // // import React, { useEffect, useState } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import {
// // // //     ReactFlow,
// // // //     ReactFlowProvider,
// // // //     Background,
// // // //     Controls,
// // // //     MiniMap,
// // // //     ConnectionMode,
// // // //     MarkerType,
// // // //     Panel
// // // // } from '@xyflow/react';
// // // // import '@xyflow/react/dist/style.css';

// // // // // 1. Zustand Brain & Actions
// // // // import { useCanvasStore } from '../store/canvasStore.js';
// // // // import { useCanvasActions } from '../hooks/useCanvasActions.js';

// // // // // 2. UI & Dictionaries (Imported cleanly from your Soul Index file)
// // // // import {
// // // //     SkeletonLoader,
// // // //     customNodeTypes,
// // // //     customEdgeTypes,
// // // //     ActionToolbar,
// // // //     AiPromptModal,
// // // //     ElectricButton
// // // // } from '../components/index.js';

// // // // export default function CanvasWorkspace() {
// // // //     const { workspaceId } = useParams();
// // // //     const navigate = useNavigate();

// // // //     const { fetchCanvas } = useCanvasActions();
// // // //     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

// // // //     // Local state to control the AI Modal visibility
// // // //     const [isModalOpen, setIsModalOpen] = useState(false);

// // // //     // Deep Hydration: Trigger download the second this page mounts
// // // //     useEffect(() => {
// // // //         if (workspaceId) {
// // // //             fetchCanvas(workspaceId);
// // // //         }
// // // //         // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //     }, [workspaceId]);

// // // //     const defaultEdgeOptions = {
// // // //         type: 'edge_orthogonal',
// // // //         markerEnd: {
// // // //             type: MarkerType.ArrowClosed,
// // // //             width: 20,
// // // //             height: 20,
// // // //             color: '#3b82f6',
// // // //         },
// // // //     };

// // // //     if (isFetching) {
// // // //         return (
// // // //             <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
// // // //                 <SkeletonLoader type="canvas" />
// // // //             </div>
// // // //         );
// // // //     }

// // // //     return (
// // // //         <ReactFlowProvider>
// // // //             <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

// // // //                 {/* --- OUTSIDE REACT FLOW: Modals and Absolute Overlays --- */}

// // // //                 {/* 1. The AI Prompt Modal */}
// // // //                 <AiPromptModal
// // // //                     isOpen={isModalOpen}
// // // //                     onClose={() => setIsModalOpen(false)}
// // // //                     workspaceId={workspaceId}
// // // //                 />

// // // //                 {/* 2. The Floating Action Toolbar */}
// // // //                 <ActionToolbar
// // // //                     workspaceId={workspaceId}
// // // //                     onOpenAiModal={() => setIsModalOpen(true)}
// // // //                 />

// // // //                 {/* --- INSIDE REACT FLOW: The Kinetic Stage --- */}
// // // //                 <ReactFlow
// // // //                     nodes={nodes}
// // // //                     edges={edges}
// // // //                     onNodesChange={onNodesChange}
// // // //                     onEdgesChange={onEdgesChange}
// // // //                     onConnect={onConnect}
// // // //                     nodeTypes={customNodeTypes}
// // // //                     edgeTypes={customEdgeTypes}
// // // //                     defaultEdgeOptions={defaultEdgeOptions}
// // // //                     connectionMode={ConnectionMode.Loose}
// // // //                     fitView
// // // //                     minZoom={0.1}
// // // //                     maxZoom={2}
// // // //                     className="touch-none"
// // // //                 >
// // // //                     <Background color="#262626" gap={24} size={2} />
// // // //                     <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />
// // // //                     <MiniMap nodeColor="#262626" maskColor="rgba(10, 10, 10, 0.8)" className="bg-moon-950" />

// // // //                     {/* 3. Simple Top-Left Dashboard Return Button */}
// // // //                     <Panel position="top-left" className="m-4">
// // // //                         <ElectricButton variant="secondary" size="sm" onClick={() => navigate('/admin/dashboard')}>
// // // //                             ← Dashboard
// // // //                         </ElectricButton>
// // // //                     </Panel>

// // // //                 </ReactFlow>
// // // //             </div>
// // // //         </ReactFlowProvider>
// // // //     );
// // // // }

// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import {
// // //     ReactFlow,
// // //     ReactFlowProvider,
// // //     Background,
// // //     Controls,
// // //     MiniMap,
// // //     ConnectionMode,
// // //     MarkerType
// // // } from '@xyflow/react';
// // // import '@xyflow/react/dist/style.css';

// // // // 1. Zustand Brain & Actions
// // // import { useCanvasStore } from '../store/canvasStore.js';
// // // import { useCanvasActions } from '../hooks/useCanvasActions.js';

// // // // 2. UI & Dictionaries (Centralized SSOT import)
// // // import {
// // //     SkeletonLoader,
// // //     customNodeTypes,
// // //     customEdgeTypes,
// // //     ActionToolbar,
// // //     CanvasHeader,
// // //     AiPromptModal
// // // } from '../components/index.js';

// // // export default function CanvasWorkspace() {
// // //     const { workspaceId } = useParams();

// // //     const { fetchCanvas } = useCanvasActions();
// // //     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

// // //     // UI Overlay States
// // //     const [isModalOpen, setIsModalOpen] = useState(false);
// // //     const [isHistoryOpen, setIsHistoryOpen] = useState(false);

// // //     // Deep Hydration on mount
// // //     useEffect(() => {
// // //         if (workspaceId) {
// // //             fetchCanvas(workspaceId);
// // //         }
// // //         // eslint-disable-next-line react-hooks/exhaustive-deps
// // //     }, [workspaceId]);

// // //     const defaultEdgeOptions = {
// // //         type: 'edge_orthogonal',
// // //         markerEnd: {
// // //             type: MarkerType.ArrowClosed,
// // //             width: 20,
// // //             height: 20,
// // //             color: '#3b82f6',
// // //         },
// // //     };

// // //     if (isFetching) {
// // //         return (
// // //             <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
// // //                 <SkeletonLoader type="canvas" />
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <ReactFlowProvider>
// // //             <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

// // //                 {/* --- 1. Top Bar: Title & Time Machine Trigger --- */}
// // //                 <CanvasHeader
// // //                     workspaceId={workspaceId}
// // //                     onOpenHistory={() => setIsHistoryOpen(true)}
// // //                 />

// // //                 {/* --- 2. Bottom Floating Action Toolbar --- */}
// // //                 <ActionToolbar
// // //                     workspaceId={workspaceId}
// // //                     onOpenAiModal={() => setIsModalOpen(true)}
// // //                 />

// // //                 {/* --- 3. AI Generator Modal Overlay --- */}
// // //                 <AiPromptModal
// // //                     isOpen={isModalOpen}
// // //                     onClose={() => setIsModalOpen(false)}
// // //                     workspaceId={workspaceId}
// // //                 />

// // //                 {/* --- 4. The Stage: React Flow Canvas --- */}
// // //                 <ReactFlow
// // //                     nodes={nodes}
// // //                     edges={edges}
// // //                     onNodesChange={onNodesChange}
// // //                     onEdgesChange={onEdgesChange}
// // //                     onConnect={onConnect}
// // //                     nodeTypes={customNodeTypes}
// // //                     edgeTypes={customEdgeTypes}
// // //                     defaultEdgeOptions={defaultEdgeOptions}
// // //                     connectionMode={ConnectionMode.Loose}
// // //                     fitView
// // //                     minZoom={0.1}
// // //                     maxZoom={2}
// // //                     className="touch-none"
// // //                 >
// // //                     <Background color="#262626" gap={24} size={2} />
// // //                     <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />
// // //                     <MiniMap nodeColor="#262626" maskColor="rgba(10, 10, 10, 0.8)" className="bg-moon-950" />
// // //                 </ReactFlow>
// // //             </div>
// // //         </ReactFlowProvider>
// // //     );
// // // }

// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import {
// //     ReactFlow,
// //     ReactFlowProvider,
// //     Background,
// //     Controls,
// //     MiniMap,
// //     ConnectionMode,
// //     MarkerType
// // } from '@xyflow/react';
// // import '@xyflow/react/dist/style.css';

// // // 1. Zustand Brain & Actions
// // import { useCanvasStore } from '../store/canvasStore.js';
// // import { useCanvasActions } from '../hooks/useCanvasActions.js';

// // // 2. UI & Dictionaries (Centralized SSOT import)
// // import {
// //     SkeletonLoader,
// //     customNodeTypes,
// //     customEdgeTypes,
// //     ActionToolbar,
// //     CanvasHeader,
// //     AiPromptModal,
// //     VersionSidebar,
// //     NodeInspector
// // } from '../components/index.js';

// // export default function CanvasWorkspace() {
// //     const { workspaceId } = useParams();
// //     const { fetchCanvas } = useCanvasActions();
// //     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

// //     // UI Overlay States
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isHistoryOpen, setIsHistoryOpen] = useState(false);

// //     // Deep Hydration on mount
// //     useEffect(() => {
// //         if (workspaceId) {
// //             fetchCanvas(workspaceId);
// //         }
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [workspaceId]);

// //     const defaultEdgeOptions = {
// //         type: 'edge_orthogonal',
// //         markerEnd: {
// //             type: MarkerType.ArrowClosed,
// //             width: 20,
// //             height: 20,
// //             color: '#3b82f6',
// //         },
// //     };

// //     if (isFetching) {
// //         return (
// //             <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
// //                 <SkeletonLoader type="canvas" />
// //             </div>
// //         );
// //     }

// //     return (
// //         <ReactFlowProvider>
// //             <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

// //                 {/* --- 1. Top Bar: Title & Time Machine Trigger --- */}
// //                 <CanvasHeader
// //                     workspaceId={workspaceId}
// //                     onOpenHistory={() => setIsHistoryOpen(true)}
// //                 />

// //                 {/* --- 2. Bottom Floating Action Toolbar --- */}
// //                 <ActionToolbar
// //                     workspaceId={workspaceId}
// //                     onOpenAiModal={() => setIsModalOpen(true)}
// //                 />

// //                 {/* --- 3. AI Generator Modal Overlay --- */}
// //                 <AiPromptModal
// //                     isOpen={isModalOpen}
// //                     onClose={() => setIsModalOpen(false)}
// //                     workspaceId={workspaceId}
// //                 />

// //                 {/* --- FIX: Added The Time Machine Sidebar --- */}
// //                 <VersionSidebar
// //                     isOpen={isHistoryOpen}
// //                     onClose={() => setIsHistoryOpen(false)}
// //                     workspaceId={workspaceId}
// //                 />

// //                 {/* --- 4. The Stage: React Flow Canvas --- */}
// //                 <ReactFlow
// //                     nodes={nodes}
// //                     edges={edges}
// //                     onNodesChange={onNodesChange}
// //                     onEdgesChange={onEdgesChange}
// //                     onConnect={onConnect}
// //                     nodeTypes={customNodeTypes}
// //                     edgeTypes={customEdgeTypes}
// //                     defaultEdgeOptions={defaultEdgeOptions}
// //                     connectionMode={ConnectionMode.Loose}
// //                     fitView
// //                     minZoom={0.1}
// //                     maxZoom={2}
// //                     className="touch-none"
// //                 >
// //                     <Background color="#262626" gap={24} size={2} />
// //                     <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />
// //                     <MiniMap nodeColor="#262626" maskColor="rgba(10, 10, 10, 0.8)" className="bg-moon-950" />
// //                 </ReactFlow>
// //             </div>
// //         </ReactFlowProvider>
// //     );
// // }

// import React, { useEffect, useState, useCallback } from 'react';
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

// // 1. Zustand Brain & Actions
// import { useCanvasStore } from '../store/canvasStore.js';
// import { useCanvasActions } from '../hooks/useCanvasActions.js';

// // 2. UI & Dictionaries (Centralized SSOT import)
// import {
//     SkeletonLoader,
//     customNodeTypes,
//     customEdgeTypes,
//     ActionToolbar,
//     CanvasHeader,
//     AiPromptModal,
//     VersionSidebar,
//     NodeInspector
// } from '../components/index.js';

// export default function CanvasWorkspace() {
//     const { workspaceId } = useParams();
//     const { fetchCanvas } = useCanvasActions();
//     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

//     // UI Overlay States
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isHistoryOpen, setIsHistoryOpen] = useState(false);

//     // The Inspector State
//     const [selectedNode, setSelectedNode] = useState(null);

//     // Deep Hydration on mount
//     useEffect(() => {
//         if (workspaceId) {
//             fetchCanvas(workspaceId);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [workspaceId]);

//     // Listen for node clicks to open the Inspector panel
//     const handleSelectionChange = useCallback(({ nodes }) => {
//         // Only open the inspector if exactly one node is selected
//         if (nodes.length === 1) {
//             setSelectedNode(nodes[0]);
//         } else {
//             setSelectedNode(null);
//         }
//     }, []);

//     const defaultEdgeOptions = {
//         type: 'edge_orthogonal',
//         markerEnd: {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#3b82f6',
//         },
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
//             <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

//                 {/* --- 1. Top Bar: Title & Time Machine Trigger --- */}
//                 <CanvasHeader
//                     workspaceId={workspaceId}
//                     onOpenHistory={() => setIsHistoryOpen(true)}
//                 />

//                 {/* --- 2. Bottom Floating Action Toolbar --- */}
//                 <ActionToolbar
//                     workspaceId={workspaceId}
//                     onOpenAiModal={() => setIsModalOpen(true)}
//                 />

//                 {/* --- 3. AI Generator Modal Overlay --- */}
//                 <AiPromptModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     workspaceId={workspaceId}
//                 />

//                 {/* --- 4. The Time Machine Sidebar --- */}
//                 <VersionSidebar
//                     isOpen={isHistoryOpen}
//                     onClose={() => setIsHistoryOpen(false)}
//                     workspaceId={workspaceId}
//                 />

//                 {/* --- 5. The Node Inspector Panel --- */}
//                 <NodeInspector
//                     selectedNode={selectedNode}
//                     onClose={() => setSelectedNode(null)}
//                 />

//                 {/* --- 6. The Stage: React Flow Canvas --- */}
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     onSelectionChange={handleSelectionChange} // Attached the selection listener
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
    MarkerType
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
    ArsenalPanel // <--- Imported
} from '../components/index.js';

export default function CanvasWorkspace() {
    const { workspaceId } = useParams();
    const { fetchCanvas } = useCanvasActions();

    // Pull the new addNode function from Zustand
    const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useCanvasStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    // We need the physical React Flow instance to calculate drop coordinates
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const reactFlowWrapper = useRef(null);

    useEffect(() => {
        if (workspaceId) {
            fetchCanvas(workspaceId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspaceId]);

    const handleSelectionChange = useCallback(({ nodes }) => {
        if (nodes.length === 1) {
            setSelectedNode(nodes[0]);
        } else {
            setSelectedNode(null);
        }
    }, []);

    // --- HTML5 DRAG & DROP HANDLERS ---
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();

        if (!reactFlowInstance) return;

        // Retrieve the data we packed in the ArsenalPanel
        const type = event.dataTransfer.getData('application/reactflow/type');
        const defaultDataString = event.dataTransfer.getData('application/reactflow/data');

        if (!type) return;

        // Calculate the drop position relative to the canvas zoom/pan
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        // Generate a random ID and construct the node
        const newNode = {
            id: `manual_${Date.now()}`,
            type,
            position,
            data: JSON.parse(defaultDataString),
        };

        addNode(newNode);
    }, [reactFlowInstance, addNode]);

    const defaultEdgeOptions = {
        type: 'edge_orthogonal',
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#3b82f6' },
    };

    if (isFetching) {
        return (
            <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
                <SkeletonLoader type="canvas" />
            </div>
        );
    }

    return (
        <ReactFlowProvider>
            {/* Added a ref to the wrapper to track DOM bounds for drops */}
            <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden" ref={reactFlowWrapper}>

                <CanvasHeader workspaceId={workspaceId} onOpenHistory={() => setIsHistoryOpen(true)} />
                <ActionToolbar workspaceId={workspaceId} onOpenAiModal={() => setIsModalOpen(true)} />
                <AiPromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} workspaceId={workspaceId} />
                <VersionSidebar isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} workspaceId={workspaceId} />
                <NodeInspector selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />

                {/* Mount the Arsenal Panel */}
                <ArsenalPanel />

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onSelectionChange={handleSelectionChange}
                    onInit={setReactFlowInstance} // Capture the instance on load
                    onDrop={onDrop}               // Handle the drop event
                    onDragOver={onDragOver}       // Allow the drop over the canvas
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
        </ReactFlowProvider>
    );
}