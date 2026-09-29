// import React from 'react';

// export default function SliderControl({ data, value, onChange }) {
//     return (
//         <div className="space-y-1.5">
//             <div className="flex justify-between text-xs font-mono">
//                 <span className="text-slate-400">Value:</span>
//                 <span className="text-emerald-400 font-semibold">{value}</span>
//             </div>
//             <input
//                 type="range"
//                 min={data.min ?? 0}
//                 max={data.max ?? 100}
//                 value={value}
//                 onChange={onChange}
//                 className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 pointer-events-auto"
//             />
//         </div>
//     );
// }

import React from 'react';

export default function SliderControl({ data, value, onChange }) {
    // Determine the broadcast variable name (defaults to 'val' if user hasn't named it)
    const variableName = data.metricKey || 'val';

    // Ensure clean floating-point precision display
    const formattedVal = Number(value).toLocaleString(undefined, {
        minimumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="space-y-2">
            {/* Context Header: Shows Variable Name and Live Signal */}
            <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 text-[10px] tracking-wider uppercase truncate max-w-[80px]" title={variableName}>
                    {variableName}
                </span>

                {/* Glowing Active Value Capsule */}
                <div className="flex items-center gap-1.5 bg-moon-950 px-2 py-0.5 rounded border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)] pointer-events-none shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-emerald-400 font-bold text-[11px] tracking-tight">
                        {formattedVal}
                    </span>
                </div>
            </div>

            {/* Precision Slider Rail */}
            <div className="relative flex items-center pt-1">
                <input
                    type="range"
                    min={data.min ?? 0}
                    max={data.max ?? 100}
                    step={data.step ?? "any"} // Permits smooth, decimal sliding
                    value={value}
                    onChange={onChange}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 pointer-events-auto transition-all"
                />
            </div>

            {/* Range Constraints Indicators */}
            <div className="flex justify-between text-[9px] font-mono text-slate-600 px-0.5 pointer-events-none">
                <span>{data.min ?? 0}</span>
                <span>{data.max ?? 100}</span>
            </div>
        </div>
    );
}