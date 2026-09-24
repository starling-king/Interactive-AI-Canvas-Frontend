import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAiActions } from '../hooks/useAiActions.js';
import { useAiStore } from '../store/aiStore.js';

export default function AiPromptModal({ isOpen, onClose, workspaceId }) {
    // 1. Dual State matching the backend API
    const [inputType, setInputType] = useState('structuredForm');
    const [promptPayload, setPromptPayload] = useState(''); // The Instructions
    const [rawInput, setRawInput] = useState(''); // The Context/Code

    const { submitPrompt, startPolling, error, clearError } = useAiActions();

    const jobStatus = useAiStore((state) => state.jobStatus);
    const resetAiState = useAiStore((state) => state.resetAiState);

    const isProcessing = jobStatus === 'queued' || jobStatus === 'processing';

    const handleGenerate = async (e) => {
        e.preventDefault();

        // Ensure primary instructions are provided
        if (!promptPayload.trim() || isProcessing) return;

        clearError();

        // The Zod Shield: If rawInput is empty, provide a safe fallback so backend validation doesn't crash
        const safeRawInput = rawInput.trim().length > 1
            ? rawInput
            : "No raw context provided. Rely strictly on the instructions.";

        const ticketId = await submitPrompt(
            workspaceId,
            inputType,
            safeRawInput, // The optional context
            promptPayload // The actual instruction
        );

        if (ticketId) {
            startPolling(ticketId, 2500);
        }
    };

    useEffect(() => {
        if (jobStatus === 'completed') {
            setPromptPayload('');
            setRawInput('');
            onClose();
            resetAiState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobStatus]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]"></span>
                                AI Architecture Generator
                            </h2>
                            <button
                                onClick={onClose}
                                disabled={isProcessing}
                                className="text-slate-400 hover:text-rose-400 transition-colors disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleGenerate} className="p-6 flex flex-col gap-5">

                            {/* Input Type Toggle */}
                            <div className="flex gap-2 p-1 bg-slate-950 rounded-lg w-fit border border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setInputType('structuredForm')}
                                    className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${inputType === 'structuredForm' ? 'bg-slate-800 text-electric' : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Standard Architecture
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInputType('rawCode')}
                                    className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${inputType === 'rawCode' ? 'bg-slate-800 text-electric' : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Code Analysis
                                </button>
                            </div>

                            {/* Main Instructions (Required) */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Instructions <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    value={promptPayload}
                                    onChange={(e) => setPromptPayload(e.target.value)}
                                    disabled={isProcessing}
                                    placeholder="What do you want to build? (e.g., 'Build a Visual State Machine showing Bubble Sort')"
                                    className="w-full h-24 bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-electric transition-colors resize-none disabled:opacity-50"
                                />
                            </div>

                            {/* Raw Context (Optional) */}
                            <div className="space-y-1.5">
                                <label className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    <span>Raw Context / Code</span>
                                    <span className="text-[10px] text-slate-600">Optional</span>
                                </label>
                                <textarea
                                    value={rawInput}
                                    onChange={(e) => setRawInput(e.target.value)}
                                    disabled={isProcessing}
                                    placeholder="Paste raw database schemas, JSON data, or Python code here for the AI to analyze..."
                                    className="w-full h-28 bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-400 font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-electric transition-colors resize-none disabled:opacity-50"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-400 text-xs font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!promptPayload.trim() || isProcessing}
                                    className="px-6 py-2.5 bg-electric hover:bg-blue-500 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        'Deploy Engine'
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}