// import React, { useCallback } from 'react';
// import {
//     ReactFlow,
//     ReactFlowProvider,
//     Background,
//     Controls,
//     MiniMap,
//     Panel,
//     ConnectionMode,
//     MarkerType
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css'; // CRITICAL: Core React Flow styles

// // 1. Import the Global Brain
// import { useCanvasStore } from '../store/canvasStore.js';

// // 2. Import Master Nodes
// import ShapeNode from '../components/nodes/ShapeNode.jsx';
// import TableNode from '../components/nodes/TableNode.jsx';
// import TextNode from '../components/nodes/TextNode.jsx';
// import IconNode from '../components/nodes/IconNode.jsx';
// import InteractiveNode from '../components/nodes/InteractiveNode.jsx';
// // (Import InteractiveNode here when we finish it in the next phase)

// // 3. Import Master Edges
// import OrthogonalEdge from '../components/edges/OrthogonalEdge.jsx';
// import StraightEdge from '../components/edges/StraightEdge.jsx';

// // 4. The Dictionaries (Mapped exactly to your AI MASTER_RULEBOOK)
// const nodeTypes = {
//     node_shape: ShapeNode,
//     node_table: TableNode,
//     node_text: TextNode,
//     node_icon: IconNode,
//     // Fallbacks to prevent crashes if AI generates an unimplemented type
//     node_interactive: ShapeNode, 
//     node_container: ShapeNode,
// };

// const edgeTypes = {
//     edge_orthogonal: OrthogonalEdge,
//     edge_relational: OrthogonalEdge, // Relational uses the same smooth step, just with a label
//     edge_kinetic: OrthogonalEdge,    // Kinetic uses the same path, but AI passes "animated: true"
//     edge_straight: StraightEdge,
// };

// export default function CanvasWorkspace() {
//     // 5. Connect strictly to the Zustand Store
//     const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

//     // 6. Global Edge Settings (Ensures every standard connection gets an arrowhead)
//     const defaultEdgeOptions = {
//         type: 'edge_orthogonal',
//         markerEnd: {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#94a3b8', // slate-400
//         },
//     };

//     return (
//         // ReactFlowProvider is required if we ever want to use hooks like `useReactFlow` inside custom nodes
//         <ReactFlowProvider>
//             <div className="w-screen h-screen bg-slate-950 font-sans">
//                 <ReactFlow
//                     nodes={nodes}
//                     edges={edges}
//                     onNodesChange={onNodesChange}
//                     onEdgesChange={onEdgesChange}
//                     onConnect={onConnect}
//                     nodeTypes={nodeTypes}
//                     edgeTypes={edgeTypes}
//                     defaultEdgeOptions={defaultEdgeOptions}
//                     connectionMode={ConnectionMode.Loose} // CRITICAL: Allows drawing arrows from anywhere on a shape boundary
//                     fitView
//                     minZoom={0.1}
//                     maxZoom={2}
//                     className="touch-none" // Prevents weird mobile scrolling behaviors
//                 >
//                     {/* The Eraser.io style dark dotted background */}
//                     <Background color="#334155" gap={24} size={2} />
                    
//                     {/* Standard navigation controls (Zoom, Pan, Fit View) */}
//                     <Controls className="bg-slate-800 border-slate-700 fill-slate-200" />
                    
//                     {/* Optional: A small map in the bottom corner */}
//                     <MiniMap 
//                         nodeColor="#475569" 
//                         maskColor="rgba(15, 23, 42, 0.8)" 
//                         className="bg-slate-900"
//                     />

//                     {/* Placeholder for your UI Top Bar / Toolbar */}
//                     <Panel position="top-center" className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-2 shadow-2xl mt-4">
//                         <div className="flex gap-4 text-slate-200 text-sm font-semibold tracking-wide">
//                             <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors">
//                                 ✨ Generate with AI
//                             </button>
//                             <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">
//                                 Free Draw
//                             </button>
//                         </div>
//                     </Panel>
//                 </ReactFlow>
//             </div>
//         </ReactFlowProvider>
//     );
// }

import { useState } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
    MiniMap,
    Panel,
    ConnectionMode,
    MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useCanvasStore } from '../store/canvasStore.js';
import AiPromptModal from '../components/AiPromptModal.jsx'; // 1. Added Modal Import

import ShapeNode from '../components/nodes/ShapeNode.jsx';
import TableNode from '../components/nodes/TableNode.jsx';
import TextNode from '../components/nodes/TextNode.jsx';
import IconNode from '../components/nodes/IconNode.jsx';
import InteractiveNode from '../components/nodes/InteractiveNode.jsx';

import OrthogonalEdge from '../components/edges/OrthogonalEdge.jsx';
import StraightEdge from '../components/edges/StraightEdge.jsx';

const nodeTypes = {
    node_shape: ShapeNode,
    node_table: TableNode,
    node_text: TextNode,
    node_icon: IconNode,
    node_interactive: InteractiveNode, // 2. Fixed this mapping
    node_container: ShapeNode,
};

const edgeTypes = {
    edge_orthogonal: OrthogonalEdge,
    edge_relational: OrthogonalEdge,
    edge_kinetic: OrthogonalEdge,
    edge_straight: StraightEdge,
};

export default function CanvasWorkspace() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();
    
    // 3. Added State for the Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const defaultEdgeOptions = {
        type: 'edge_orthogonal',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#94a3b8',
        },
    };

    return (
        <ReactFlowProvider>
            <div className="w-screen h-screen bg-slate-950 font-sans">
                
                {/* 4. Mounted the Modal */}
                <AiPromptModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    workspaceId="test-workspace-id" 
                />

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    defaultEdgeOptions={defaultEdgeOptions}
                    connectionMode={ConnectionMode.Loose}
                    fitView
                    minZoom={0.1}
                    maxZoom={2}
                    className="touch-none"
                >
                    <Background color="#334155" gap={24} size={2} />
                    <Controls className="bg-slate-800 border-slate-700 fill-slate-200" />
                    <MiniMap nodeColor="#475569" maskColor="rgba(15, 23, 42, 0.8)" className="bg-slate-900" />

                    <Panel position="top-center" className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-2 shadow-2xl mt-4">
                        <div className="flex gap-4 text-slate-200 text-sm font-semibold tracking-wide">
                            {/* 5. Wired the button to open the modal */}
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                            >
                                ✨ Generate with AI
                            </button>
                            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">
                                Free Draw
                            </button>
                        </div>
                    </Panel>
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
}