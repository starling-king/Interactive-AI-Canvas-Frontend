import React from 'react';

export default function MathControl({ results }) {
    return (
        <div className="space-y-1 font-mono text-xs">
            {Object.keys(results).length > 0 ? (
                Object.entries(results).map(([key, val]) => {
                    let displayValue = typeof val === 'number' ? val.toFixed(2)
                        : typeof val === 'object' && val !== null ? JSON.stringify(val)
                            : String(val);

                    return (
                        <div key={key} className="flex justify-between items-center bg-slate-800/60 px-2 py-1.5 rounded mt-1 overflow-hidden">
                            <span className="text-slate-300 shrink-0 mr-2">{key}:</span>
                            <span className="text-blue-400 font-semibold truncate" title={displayValue}>
                                {displayValue}
                            </span>
                        </div>
                    );
                })
            ) : (
                <div className="text-[11px] text-slate-500 italic">Awaiting calculation...</div>
            )}
        </div>
    );
}