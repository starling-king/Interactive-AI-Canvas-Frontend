import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAiActions } from '../hooks/useAiActions.js';
import { useAiStore } from '../store/aiStore.js';

export default function AiPromptModal({ isOpen, onClose, workspaceId }) {
    const [prompt, setPrompt] = useState('');
    const { submitPrompt, startPolling, error, clearError } = useAiActions();
    const jobStatus = useAiStore((state) => state.jobStatus);

    const isProcessing = jobStatus === 'queued' || jobStatus === 'processing';

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isProcessing) return;

        clearError();
        
        // Fire the prompt to the backend
        const ticketId = await submitPrompt(
            workspaceId, 
            'structuredForm', // Ensure this matches your backend controller expectation
            prompt, 
            'Use orthogonal stepped lines, interactive nodes, and standard flowchart shapes.'
        );

        // Start listening for the JSON
        if (ticketId) {
            startPolling(ticketId, 2500); 
        }
    };

    // Close modal when completed successfully
    useEffect(() => {
        if (jobStatus === 'completed') {
            setPrompt('');
            onClose(); 
        }
    }, [jobStatus, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                <span>✨</span> AI Architecture Generator
                            </h2>
                            <button 
                                onClick={onClose}
                                disabled={isProcessing}
                                className="text-slate-400 hover:text-slate-200 disabled:opacity-50"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleGenerate}>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isProcessing}
                                placeholder="Describe the system architecture, database schema, or logic flow you want to build..."
                                className="w-full h-32 bg-slate-800 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
                            />

                            {error && (
                                <div className="mt-3 p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!prompt.trim() || isProcessing}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
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
                                        'Generate'
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