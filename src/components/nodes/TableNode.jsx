import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function TableNode({ data, selected, isConnectable }) {
    const title = data.title || data.label || 'Entity';
    const rows = Array.isArray(data.rows) ? data.rows : [];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className={`min-w-[220px] max-w-[320px] bg-slate-900/95 border rounded-xl shadow-2xl overflow-hidden backdrop-blur-md transition-all ${selected
                ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-blue-500/20'
                : 'border-slate-700/80 hover:border-slate-500'
                }`}
        >
            {/* Top / Bottom Handles */}
            <Handle
                type="target"
                position={Position.Top}
                id="top"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Handle
                type="source"
                position={Position.Top}
                id="top"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"
            />

            <Handle
                type="target"
                position={Position.Bottom}
                id="bottom"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity"
            />

            {/* Relational Handles for 1:N / N:1 Database Connections */}
            <Handle
                type="target"
                position={Position.Left}
                id="left"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5"
            />
            {/* Relational Handles for 1:N / N:1 Database Connections */}
            <Handle
                type="source"
                position={Position.Left}
                id="left"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5"
            />

            <Handle
                type="target"
                position={Position.Right}
                id="right"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5"
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                isConnectable={isConnectable}
                className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5"
            />

            {/* Table Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-800/80 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                    {/* Database Table Icon */}
                    <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                    <span className="font-semibold text-xs text-slate-100 font-mono tracking-tight truncate">
                        {title}
                    </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800">
                    table
                </span>
            </div>

            {/* Table Body / Rows */}
            <div className="divide-y divide-slate-800/60">
                {rows.length > 0 ? (
                    rows.map((row, index) => {
                        const isPk = typeof row.type === 'string' && row.type.toLowerCase().includes('pk');
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-800/40 transition-colors text-xs"
                            >
                                <span className="font-medium text-slate-200 font-mono text-[11px] truncate mr-2">
                                    {row.name}
                                </span>
                                <span
                                    className={`font-mono text-[10px] shrink-0 ${isPk
                                        ? 'text-emerald-400 font-semibold'
                                        : 'text-slate-400'
                                        }`}
                                >
                                    {row.type}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="px-3 py-2 text-[11px] text-slate-500 italic text-center font-mono">
                        No columns defined
                    </div>
                )}
            </div>
        </motion.div>
    );
}