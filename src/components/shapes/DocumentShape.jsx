import React from 'react';

export default function DocumentShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Quadratic Bezier curves (Q and T) to create the classic document wave */}
            <path d="M2,2 L98,2 L98,80 Q75,100 50,80 T2,80 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" className="opacity-90" />
        </svg>
    );
}