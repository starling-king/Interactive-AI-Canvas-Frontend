import React from 'react';

export default function SliderControl({ data, value, onChange }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Value:</span>
                <span className="text-emerald-400 font-semibold">{value}</span>
            </div>
            <input
                type="range"
                min={data.min ?? 0}
                max={data.max ?? 100}
                value={value}
                onChange={onChange}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 pointer-events-auto"
            />
        </div>
    );
}