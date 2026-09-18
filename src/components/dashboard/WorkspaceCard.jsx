import React from "react";
import GlassCard from "../ui/GlassCard.jsx";
import ElectricButton from "../ui/ElectricButton.jsx";

export default function WorkspaceCard({ workspace, onOpen, onDelete }) {
    // Defensive check in case data is malformed
    if (!workspace) return null;

    // Format the date into a clean, human-readable string
    const formattedDate = new Date(workspace.updatedAt || workspace.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <GlassCard
            variant="interactive"
            padding="md"
            className="flex flex-col h-full justify-between group"
        >
            {/* Top Section: Badges & Title */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-electric bg-electric/10 rounded-md border border-electric/20">
                        {workspace.diagramType || "Architecture"}
                    </span>

                    {/* Status Dot */}
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${workspace.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-moon-800'}`} />
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                            {workspace.isPublished ? 'Live' : 'Draft'}
                        </span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-electric transition-colors duration-300">
                    {workspace.title || "Untitled Node"}
                </h3>

                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {workspace.description || "No description provided for this architecture graph."}
                </p>
            </div>

            {/* Bottom Section: Meta & Actions */}
            <div className="mt-6 pt-4 border-t border-moon-800/80 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">
                        Last Edited
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                        {formattedDate}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <ElectricButton
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents the card's onClick (if any) from firing
                            onDelete(workspace._id);
                        }}
                        className="hover:text-rose-400 hover:bg-rose-500/10"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </ElectricButton>

                    <ElectricButton
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen(workspace._id);
                        }}
                    >
                        Access
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </ElectricButton>
                </div>
            </div>
        </GlassCard>
    );
}