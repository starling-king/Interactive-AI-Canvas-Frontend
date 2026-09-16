import React from 'react';

export default function StarShape({ className = "w-full h-full text-slate-800" }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Exact 5-point star coordinates mapped to a 100x100 grid */}
            <polygon points="50,2 63,38 98,38 69,59 80,95 50,73 20,95 31,59 2,38 37,38" fill="currentColor" stroke="currentColor" strokeWidth="2" className="opacity-90" />
        </svg>
    );
}