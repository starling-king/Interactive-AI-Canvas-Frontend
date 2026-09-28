

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeWrapper from './NodeWrapper.jsx';

// 1. THE ICON REGISTRY (Single Source of Truth)
// Maintains all standard vector geometries. 
export const IconRegistry = {
    server: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
    ),
    database: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    cloud: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    ),
    api: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    microservice: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    user: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    ),
    users: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="16 11 18 11 22 11" />
        </svg>
    ),
    lock: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    key: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
    ),
    pulse: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    cpu: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
    ),
    brain: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
    ),
    filter: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    ),
    mail: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    mobile: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    ),
    globe: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    bot: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" /><line x1="8" y1="16" x2="8.01" y2="16" /><line x1="16" y1="16" x2="16.01" y2="16" />
        </svg>
    ),
    shield: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    default: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    )
};

export default function IconNode({ id, data, selected, isConnectable }) {
    const iconName = data.iconType || 'default';
    const IconComponent = IconRegistry[iconName] || IconRegistry.default;

    // 2. SCALABLE ANIMATION
    // Allows user/AI to define exactly how this specific icon behaves physically on the canvas.
    const activeAnimation = data.animationStyle || 'pulse';

    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={80} minHeight={80} defaultAnimation={activeAnimation}>
            <div className="relative group flex flex-col items-center justify-center w-full h-full p-2 pointer-events-auto">

                {/* 3. INVISIBLE ROUTING ZONES */}
                {/* Clean, standard handles mapped to the 4 cardinal directions */}
                <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                {/* 
                  4. THE FLUID GLASS BADGE
                  'flex-1 w-full' forces this background box to expand fluidly with the React Flow resizer bounds.
                  It matches the deep void aesthetic of the Arsenal panel using moon-900.
                */}
                <div className={`flex items-center justify-center flex-1 w-full rounded-2xl border transition-colors shrink-0 ${selected ? 'border-electric bg-moon-800 shadow-[0_0_15px_var(--color-electric-glow)] text-electric' : 'border-moon-700 bg-moon-900/90 text-slate-300 shadow-xl'
                    }`}>
                    {/* 
                      5. PROPORTIONAL SCALING
                      'w-1/2 h-1/2' guarantees the SVG or future HTML elements will always take up exactly 50% 
                      of the glass badge, remaining perfectly crisp and centered no matter how massive the user makes it.
                    */}
                    <IconComponent className="w-1/2 h-1/2 pointer-events-none" />
                </div>

                {/* 6. LABEL SYSTEM */}
                {data.label && (
                    <span className="mt-2 text-center text-[10px] font-bold tracking-widest uppercase text-slate-400 break-words w-full pointer-events-none shrink-0">
                        {data.label}
                    </span>
                )}
            </div>
        </NodeWrapper>
    );
}