import React, { useId } from "react";

const GlassInput = React.forwardRef(
    (
        {
            label,
            type = "text",
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

                {/* Input Wrapper for Glow Effects */}
                <div className="relative group transition-all duration-300">
                    <input
                        id={id}
                        type={type}
                        ref={ref}
                        required={required}
                        className={`
              w-full px-5 py-3 text-sm font-medium text-slate-100 placeholder-slate-500
              glass-panel bg-moon-900/60 /* Connects to index.css SSOT */
              border-moon-800
              rounded-xl outline-none transition-all duration-300
              focus:bg-moon-900 focus:border-electric focus:ring-1 focus:ring-electric focus:electric-shadow
              ${error
                                ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500 focus:shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                                : "hover:border-moon-800/80"
                            }
              ${className}
            `}
                        {...props}
                    />
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

GlassInput.displayName = "GlassInput";
export default GlassInput;