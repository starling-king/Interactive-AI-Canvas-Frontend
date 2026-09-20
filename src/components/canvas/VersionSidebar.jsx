// import React, { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useVersionStore } from '../../store/versionStore.js';
// import { useVersionActions } from '../../hooks/useVersionActions.js';

// import GlassCard from '../ui/GlassCard.jsx';
// import ElectricButton from '../ui/ElectricButton.jsx';
// import SkeletonLoader from '../ui/SkeletonLoader.jsx';

// export default function VersionSidebar({ isOpen, onClose, workspaceId }) {
//     const { history, isFetching } = useVersionStore();
//     const { fetchHistory, restoreVersion, isLoading } = useVersionActions();

//     // Fetch the history from the database every time the drawer opens
//     useEffect(() => {
//         if (isOpen && workspaceId) {
//             fetchHistory(workspaceId);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isOpen, workspaceId]);

//     const handleRestore = async (versionId) => {

//         const confirmRestore = window.confirm(
//             "WARNING: Restoring this version will overwrite your current live canvas.\n\nDid you remember to 'Commit Snapshot' for your current work? Click OK to proceed with the restore."
//         );

//         if (!confirmRestore) return;

//         const success = await restoreVersion(versionId, workspaceId);
//         if (success) {
//             onClose(); // Automatically close the drawer so the user sees the restored canvas
//         }
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         className="fixed inset-0 z-40 bg-moon-950/60 backdrop-blur-sm"
//                     />

//                     {/* Sliding Drawer */}
//                     <motion.div
//                         initial={{ x: '100%' }}
//                         animate={{ x: 0 }}
//                         exit={{ x: '100%' }}
//                         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//                         className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm border-l border-moon-800 bg-moon-900 shadow-2xl flex flex-col"
//                     >
//                         {/* Header */}
//                         <div className="flex items-center justify-between p-6 border-b border-moon-800 bg-moon-900/50">
//                             <div className="flex items-center gap-3">
//                                 <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-electric/10 border border-electric/20 text-electric">
//                                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                     </svg>
//                                 </div>
//                                 <h2 className="text-lg font-display font-bold text-slate-100 uppercase tracking-wide">
//                                     Time Machine
//                                 </h2>
//                             </div>
//                             <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         {/* History List */}
//                         <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
//                             {isFetching ? (
//                                 <SkeletonLoader count={4} type="text" className="mb-6" />
//                             ) : history.length > 0 ? (
//                                 history.map((ver) => (
//                                     <GlassCard key={ver._id} padding="sm" className="flex flex-col gap-3 group">
//                                         <div className="flex items-start justify-between">
//                                             <span className="text-[10px] font-bold tracking-widest text-electric uppercase bg-electric/10 px-2 py-1 rounded">
//                                                 v{ver.versionNumber}
//                                             </span>
//                                             <span className="text-[10px] font-mono text-slate-500">
//                                                 {new Date(ver.createdAt).toLocaleString()}
//                                             </span>
//                                         </div>
//                                         <p className="text-sm text-slate-300">
//                                             {ver.changeSummary}
//                                         </p>
//                                         <div className="pt-3 border-t border-moon-800 flex justify-end">
//                                             <ElectricButton
//                                                 variant="secondary"
//                                                 size="sm"
//                                                 onClick={() => handleRestore(ver._id)}
//                                                 isLoading={isLoading}
//                                                 className="w-full sm:w-auto"
//                                             >
//                                                 Restore Snapshot
//                                             </ElectricButton>
//                                         </div>
//                                     </GlassCard>
//                                 ))
//                             ) : (
//                                 <div className="text-center py-12">
//                                     <div className="w-12 h-12 rounded-full bg-moon-800/50 flex items-center justify-center mx-auto mb-4 text-slate-600">
//                                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                                         </svg>
//                                     </div>
//                                     <h3 className="text-sm font-bold text-slate-300">No Snapshots Found</h3>
//                                     <p className="text-xs text-slate-500 mt-1">Use the header button to commit your first architecture version.</p>
//                                 </div>
//                             )}
//                         </div>
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// }

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVersionStore } from '../../store/versionStore.js';
import { useVersionActions } from '../../hooks/useVersionActions.js';

import GlassCard from '../ui/GlassCard.jsx';
import ElectricButton from '../ui/ElectricButton.jsx';
import SkeletonLoader from '../ui/SkeletonLoader.jsx';

export default function VersionSidebar({ isOpen, onClose, workspaceId }) {
    const { history, isFetching } = useVersionStore();
    const { fetchHistory, restoreVersion, isLoading } = useVersionActions();

    // Custom state to track which version the user is currently trying to restore
    const [confirmingId, setConfirmingId] = useState(null);

    // Fetch the history from the database every time the drawer opens
    useEffect(() => {
        if (isOpen && workspaceId) {
            fetchHistory(workspaceId);
            setConfirmingId(null); // Reset any active warnings when opened
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, workspaceId]);

    const handleRestore = async (versionId) => {
        const success = await restoreVersion(versionId, workspaceId);
        if (success) {
            setConfirmingId(null);
            onClose(); // Automatically close the drawer so the user sees the restored canvas
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-moon-950/60 backdrop-blur-sm"
                    />

                    {/* Sliding Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm border-l border-moon-800 bg-moon-900 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-moon-800 bg-moon-900/50">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-electric/10 border border-electric/20 text-electric">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-display font-bold text-slate-100 uppercase tracking-wide">
                                    Time Machine
                                </h2>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* History List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                            {isFetching ? (
                                <SkeletonLoader count={4} type="text" className="mb-6" />
                            ) : history.length > 0 ? (
                                history.map((ver) => (
                                    <GlassCard key={ver._id} padding="sm" className={`flex flex-col gap-3 transition-colors duration-300 ${confirmingId === ver._id ? 'border-rose-900/50 bg-rose-950/10' : ''}`}>
                                        <div className="flex items-start justify-between">
                                            <span className="text-[10px] font-bold tracking-widest text-electric uppercase bg-electric/10 px-2 py-1 rounded">
                                                v{ver.versionNumber}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-500">
                                                {new Date(ver.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-300">
                                            {ver.changeSummary}
                                        </p>

                                        {/* The Inline Warning State */}
                                        {confirmingId === ver._id ? (
                                            <div className="pt-3 border-t border-moon-800 space-y-3 animate-[slideDown_0.2s_ease-out]">
                                                <p className="text-[11px] font-bold text-rose-400 leading-snug">
                                                    ⚠️ WARNING: Restoring will instantly overwrite your live canvas. Uncommitted changes will be lost.
                                                </p>
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => setConfirmingId(null)}
                                                        className="text-xs font-bold px-3 text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <ElectricButton
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleRestore(ver._id)}
                                                        isLoading={isLoading}
                                                    >
                                                        Overwrite
                                                    </ElectricButton>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="pt-3 border-t border-moon-800 flex justify-end">
                                                <ElectricButton
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => setConfirmingId(ver._id)}
                                                    className="w-full sm:w-auto hover:bg-rose-900/50 hover:text-rose-400 hover:border-rose-900 transition-colors"
                                                >
                                                    Restore Snapshot
                                                </ElectricButton>
                                            </div>
                                        )}
                                    </GlassCard>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-12 h-12 rounded-full bg-moon-800/50 flex items-center justify-center mx-auto mb-4 text-slate-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-300">No Snapshots Found</h3>
                                    <p className="text-xs text-slate-500 mt-1">Use the header button to commit your first architecture version.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}