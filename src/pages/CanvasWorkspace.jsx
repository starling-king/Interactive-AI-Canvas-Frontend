// import React, { useEffect } from 'react';
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

// // 2. UI & Dictionaries (Imported cleanly from your Soul Index file)
// import { SkeletonLoader, customNodeTypes, customEdgeTypes } from '../components/index.js';

// export default function CanvasWorkspace() {
//     // 3. Extract the ID from the URL (Deep Linking)
//     const { workspaceId } = useParams();

//     // 4. Get the network action
//     const { fetchCanvas } = useCanvasActions();

//     // 5. Connect to the Live State
//     const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

//     // 6. Deep Hydration: Trigger download the second this page mounts
//     useEffect(() => {
//         if (workspaceId) {
//             fetchCanvas(workspaceId);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [workspaceId]);

//     const defaultEdgeOptions = {
//         type: 'edge_orthogonal',
//         markerEnd: {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#3b82f6', // Electric Blue arrows for the dark theme
//         },
//     };

//     // 7. The Loading Block: Show your Skeleton Loader while fetching from the DB
//     if (isFetching) {
//         return (
//             <div className="w-screen h-screen bg-moon-950 flex items-center justify-center">
//                 <SkeletonLoader type="canvas" />
//             </div>
//         );
//     }

//     // 8. The Kinetic Render: The data has arrived!
//     return (
//         <ReactFlowProvider>
//             {/* The Void Background from your index.css SSOT */}
//             <div className="w-screen h-screen bg-moon-950 font-sans">
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     nodeTypes={customNodeTypes}
//                     edgeTypes={customEdgeTypes}
//                     defaultEdgeOptions={defaultEdgeOptions}
//                     connectionMode={ConnectionMode.Loose}
//                     fitView
//                     minZoom={0.1}
//                     maxZoom={2}
//                     className="touch-none"
//                 >
//                     {/* The dark dotted background */}
//                     <Background color="#262626" gap={24} size={2} /> {/* moon-800 */}

//                     {/* Standard navigation controls */}
//                     <Controls className="bg-moon-900 border-moon-800 fill-slate-200" />

//                     <MiniMap
//                         nodeColor="#262626"
//                         maskColor="rgba(10, 10, 10, 0.8)"
//                         className="bg-moon-950"
//                     />

//                     {/* STEP 3 PLACEMENT: We will layer the CanvasHeader and ActionToolbar here next! */}

//                 </ReactFlow>
//             </div>
//         </ReactFlowProvider>
//     );
// }

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
    MiniMap,
    ConnectionMode,
    MarkerType,
    Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 1. Zustand Brain & Actions
import { useCanvasStore } from '../store/canvasStore.js';
import { useCanvasActions } from '../hooks/useCanvasActions.js';

// 2. UI & Dictionaries (Imported cleanly from your Soul Index file)
import {
    SkeletonLoader,
    customNodeTypes,
    customEdgeTypes,
    ActionToolbar,
    AiPromptModal,
    ElectricButton
} from '../components/index.js';

export default function CanvasWorkspace() {
    const { workspaceId } = useParams();
    const navigate = useNavigate();

    const { fetchCanvas } = useCanvasActions();
    const { isFetching, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

    // Local state to control the AI Modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Deep Hydration: Trigger download the second this page mounts
    useEffect(() => {
        if (workspaceId) {
            fetchCanvas(workspaceId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workspaceId]);

    const defaultEdgeOptions = {
        type: 'edge_orthogonal',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#3b82f6',
        },
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
            <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

                {/* --- OUTSIDE REACT FLOW: Modals and Absolute Overlays --- */}

                {/* 1. The AI Prompt Modal */}
                <AiPromptModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    workspaceId={workspaceId}
                />

                {/* 2. The Floating Action Toolbar */}
                <ActionToolbar
                    workspaceId={workspaceId}
                    onOpenAiModal={() => setIsModalOpen(true)}
                />

                {/* --- INSIDE REACT FLOW: The Kinetic Stage --- */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
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

                    {/* 3. Simple Top-Left Dashboard Return Button */}
                    <Panel position="top-left" className="m-4">
                        <ElectricButton variant="secondary" size="sm" onClick={() => navigate('/admin/dashboard')}>
                            ← Dashboard
                        </ElectricButton>
                    </Panel>

                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
}