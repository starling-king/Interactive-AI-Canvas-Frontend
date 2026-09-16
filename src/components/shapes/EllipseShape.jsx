import React from 'react';

export default function EllipseShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            <ellipse 
                cx="50" 
                cy="50" 
                rx="48" 
                ry="48" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="opacity-90"
            />
        </svg>
    );
}