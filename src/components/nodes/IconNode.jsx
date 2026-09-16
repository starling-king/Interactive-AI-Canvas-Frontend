import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

// A lightweight inline SVG dictionary for your MVP icons.
// The AI will pass data.iconType (e.g., 'pulse', 'database', 'server')
const IconRegistry = {
    pulse: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    database: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    server: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
    ),
    // Fallback if the AI hallucinates an icon name
    default: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
};

export default function IconNode({ data, selected, isConnectable }) {
    const iconName = data.iconType || 'default';
    const IconComponent = IconRegistry[iconName] || IconRegistry.default;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative group flex items-center justify-center w-16 h-16 rounded-xl border-2 transition-colors ${
                selected ? 'border-blue-500 bg-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-600 bg-slate-900/90'
            }`}
        >
            {/* Invisible Handles that appear on hover for clean UX */}
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-2.5 h-2.5 bg-blue-500 border-none transition-opacity" />
            
            {/* The Resizable Icon */}
            <IconComponent className="w-8 h-8 text-slate-300" />
            
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-2.5 h-2.5 bg-blue-500 border-none transition-opacity" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-2.5 h-2.5 bg-blue-500 border-none transition-opacity" />
        </motion.div>
    );
}