import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/workspaceStore.js';
import { useVersionActions } from '../../hooks/useVersionActions.js';

import GlassCard from '../ui/GlassCard.jsx';
import ElectricButton from '../ui/ElectricButton.jsx';

export default function CanvasHeader({ workspaceId, onOpenHistory }) {
    const navigate = useNavigate();

    const workspaces = useWorkspaceStore(state => state.workspaces);
    const currentWorkspace = workspaces.find(w => w._id === workspaceId);

    const { createVersion, isLoading } = useVersionActions();

    // Custom UI State to replace the unsupported window.prompt()
    const [isDrafting, setIsDrafting] = useState(false);
    const [summary, setSummary] = useState("");

    const handleCommit = async () => {
        if (!summary.trim()) return; // Prevent empty commits

        const success = await createVersion(workspaceId, summary);
        if (success) {
            setIsDrafting(false); // Close the input
            setSummary("");       // Reset the input
            onOpenHistory();      // Slide open the Time Machine to show success
        }
    };

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-none">
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
                    <h1 className="text-sm font-display font-bold text-slate-100 tracking-wide uppercase truncate max-w-[200px]">
                        {currentWorkspace?.title || 'Loading Workspace...'}
                    </h1>
                </div>

                {/* Right Side: Version Control / Time Machine */}
                <div className="flex items-center gap-3">

                    {/* The sleek inline Commit Input */}
                    {isDrafting ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                autoFocus
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Version summary..."
                                className="px-3 py-1.5 text-sm font-mono bg-moon-950 border border-moon-800 rounded-lg text-slate-200 focus:outline-none focus:border-electric transition-colors w-48"
                                onKeyDown={(e) => e.key === 'Enter' && handleCommit()}
                            />
                            <ElectricButton
                                variant="primary"
                                size="sm"
                                onClick={handleCommit}
                                isLoading={isLoading}
                            >
                                Confirm
                            </ElectricButton>
                            <button
                                onClick={() => setIsDrafting(false)}
                                className="text-slate-400 hover:text-rose-400 text-xs font-bold px-2 uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <ElectricButton
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsDrafting(true)}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Commit Snapshot
                        </ElectricButton>
                    )}

                    <div className="w-px h-4 bg-moon-800 mx-1" />

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