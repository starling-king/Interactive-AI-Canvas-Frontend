import React from 'react';
import { motion } from 'framer-motion';

export default function ToggleControl({ state, onToggle }) {
    return (
        <div className="flex items-center justify-between py-1">
            <span className="text-xs text-slate-300 font-mono">State</span>
            <button
                type="button"
                onClick={onToggle}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors pointer-events-auto ${state ? 'bg-emerald-600' : 'bg-slate-700'
                    }`}
            >
                <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`bg-white w-4 h-4 rounded-full shadow-md ${state ? 'ml-auto' : ''}`}
                />
            </button>
        </div>
    );
}