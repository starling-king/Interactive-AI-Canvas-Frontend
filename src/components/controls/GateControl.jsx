import React from 'react';

export default function GateControl({ condition, passed }) {
    return (
        <div className="space-y-1.5 font-mono text-xs text-center">
            <div className="text-[10px] text-slate-400 truncate" title={condition}>{condition}</div>
            <div
                className={`py-1 rounded font-bold uppercase tracking-wider text-[11px] ${passed
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-600/50'
                    }`}
            >
                {passed ? 'Pass' : 'Reject'}
            </div>
        </div>
    );
}