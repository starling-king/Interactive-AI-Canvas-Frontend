import React, { useId } from "react";

const GlassSelect = React.forwardRef(
    (
        {
            options = [],
            label,
            error = "",
            required = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const id = useId();

        return (
            <div className="w-full space-y-1.5 text-left">
                {/* Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-xs font-bold tracking-wider uppercase text-slate-400"
                    >
                        {label} {required && <span className="text-electric">*</span>}
                    </label>
                )}

                {/* Select Wrapper for Glow Effects and Custom Arrow */}
                <div className="relative group transition-all duration-300">
                    <select
                        id={id}
                        ref={ref}
                        required={required}
                        className={`
              w-full px-5 py-3 pr-10 text-sm font-medium text-slate-100 placeholder-slate-500
              glass-panel bg-moon-900/60 /* Connects to index.css SSOT */
              border-moon-800
              rounded-xl outline-none transition-all duration-300 appearance-none cursor-pointer
              focus:bg-moon-900 focus:border-electric focus:ring-1 focus:ring-electric focus:electric-shadow
              ${error
                                ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500 focus:shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                                : "hover:border-moon-800/80"
                            }
              ${className}
            `}
                        {...props}
                    >
                        {options.map((option) => (
                            <option
                                key={option.value || option}
                                value={option.value || option}
                                className="bg-moon-900 text-slate-200" // Prevents white background on opened dropdown options
                            >
                                {option.label || option}
                            </option>
                        ))}
                    </select>

                    {/* Custom Dropdown Arrow (Replaces default browser styling) */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 group-hover:text-electric transition-colors duration-300">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-[11px] font-semibold text-rose-400 mt-1 animate-pulse">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

GlassSelect.displayName = "GlassSelect";
export default GlassSelect;