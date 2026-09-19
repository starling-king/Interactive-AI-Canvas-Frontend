import React from 'react';
import { useCanvasActions } from '../../hooks/useCanvasActions.js';

// Import your enterprise UI components
import GlassCard from '../ui/GlassCard.jsx';
import ElectricButton from '../ui/ElectricButton.jsx';

export default function ActionToolbar({ workspaceId, onOpenAiModal }) {
    // Consume the save action directly from your custom hook
    const { saveCanvas, isSaving } = useCanvasActions();

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
            {/* A pill-shaped floating glass dock */}
            <GlassCard
                padding="none"
                className="flex items-center gap-2 px-4 py-3 rounded-full border-moon-800 bg-moon-900/90 shadow-2xl"
            >
                <ElectricButton
                    variant="secondary"
                    size="sm"
                    onClick={() => saveCanvas(workspaceId)}
                    isLoading={isSaving}
                    className="rounded-full"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Draft
                </ElectricButton>

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-moon-700 mx-1" />

                <ElectricButton
                    variant="primary"
                    size="sm"
                    onClick={onOpenAiModal}
                    className="rounded-full shadow-[0_0_15px_var(--color-electric-glow)]"
                >
                    ✨ Generate AI
                </ElectricButton>
            </GlassCard>
        </div>
    );
}