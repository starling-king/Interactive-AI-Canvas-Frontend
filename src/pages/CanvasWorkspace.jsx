import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

// 1. Data Layer
import { useCanvasStore } from '../store/canvasStore.js';
import { useCanvasActions } from '../hooks/useCanvasActions.js';

// 2. UI Arsenal & Master Dictionaries (SSOT)
import {
    ElectricButton,
    GlassCard,
    AiPromptModal,
    customNodeTypes,
    customEdgeTypes
} from '../components/index.js';

export default function CanvasWorkspace() {
    // We pull the ID from the URL (e.g., /workspace/12345)
    const { id: workspaceId } = useParams();
    const navigate = useNavigate();

    // Zustand State
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

    // Actions
    const { fetchCanvas, saveCanvas, isSaving } = useCanvasActions();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial Load: Fetch the specific canvas from the backend
    useEffect(() => {
        if (workspaceId) {
            fetchCanvas(workspaceId);
        }
    }, [workspaceId, fetchCanvas]);

    // Save Handler
    const handleSave = async () => {
        if (workspaceId) {
            await saveCanvas(workspaceId);
            // Optional: You could trigger a toast notification here if you want
        }
    };

    // Ensure our arrows match the 60/30/10 theme (Slate/Charcoal)
    const defaultEdgeOptions = {
        type: 'edge_orthogonal',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#475569', // slate-600 to match the charcoal vibe
        },
    };

    return (
        <ReactFlowProvider>
            {/* 1. THE VOID: Enforcing the true Charcoal Grey background */}
            <div className="w-screen h-screen bg-moon-950 font-sans relative overflow-hidden">

                {/* 2. Abstract Ambient Light */}
                <div className="absolute inset-0 bg-abstract-glow pointer-events-none z-0" />

                {/* 3. The AI Modal Overlay */}
                <AiPromptModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    workspaceId={workspaceId}
                />

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
                    proOptions={{ hideAttribution: true }} // Traps user in the app
                    className="touch-none z-10"
                >
                    {/* Dark dotted background mapping to Charcoal */}
                    <Background color="#1e293b" gap={24} size={2} />

                    {/* Controls colored to match the Dark Moonlight theme */}
                    <Controls className="bg-moon-900 border-moon-800 fill-slate-300" />

                    <MiniMap
                        nodeColor="#262626" // moon-800
                        maskColor="rgba(10, 10, 10, 0.8)" // moon-950 with opacity
                        className="bg-moon-900 border border-moon-800 rounded-xl"
                    />

                    {/* 4. THE FLOATING COMMAND BAR */}
                    <Panel position="top-center" className="mt-6 w-full max-w-2xl px-4 pointer-events-none">
                        <GlassCard padding="none" className="pointer-events-auto flex items-center justify-between px-4 py-2 border-moon-800">

                            {/* Navigation back to Dashboard */}
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className="p-2 text-slate-400 hover:text-electric transition-colors outline-none flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Dashboard</span>
                            </button>

                            {/* The Arsenal Tools */}
                            <div className="flex items-center gap-3">

                                {/* Save Button */}
                                <ElectricButton
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleSave}
                                    isLoading={isSaving}
                                >
                                    Save
                                </ElectricButton>

                                <ElectricButton
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setIsModalOpen(true)}
                                    className="shadow-[0_0_15px_var(--color-electric-glow)]"
                                >
                                    <span className="text-[10px] mr-1">✦</span> Generate AI
                                </ElectricButton>
                            </div>

                        </GlassCard>
                    </Panel>
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
}