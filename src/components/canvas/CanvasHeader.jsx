import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/workspaceStore.js';

// Import your enterprise UI components
import GlassCard from '../ui/GlassCard.jsx';
import ElectricButton from '../ui/ElectricButton.jsx';

export default function CanvasHeader({ workspaceId, onOpenHistory }) {
    const navigate = useNavigate();

    // Extract the workspace metadata from Zustand to get the Title
    const workspaces = useWorkspaceStore(state => state.workspaces);
    const currentWorkspace = workspaces.find(w => w._id === workspaceId);

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 pointer-events-none">
            <GlassCard
                padding="none"
                className="pointer-events-auto flex items-center justify-between px-5 py-3 border-moon-800 bg-moon-900/90 shadow-2xl rounded-2xl"
            >
                {/* Left Side: Navigation & Title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="text-slate-400 hover:text-electric transition-colors outline-none"
                        title="Back to Dashboard"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>

                    <div className="w-px h-6 bg-moon-700" />

                    <h1 className="text-sm font-display font-bold text-slate-100 tracking-wide uppercase">
                        {currentWorkspace?.title || 'Loading Workspace...'}
                    </h1>
                </div>

                {/* Right Side: Version Control / Time Machine */}
                <div className="flex items-center gap-3">
                    <ElectricButton
                        variant="secondary"
                        size="sm"
                        onClick={onOpenHistory}
                        className="shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    >
                        <svg className="w-4 h-4 mr-2 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Time Machine
                    </ElectricButton>
                </div>
            </GlassCard>
        </div>
    );
}