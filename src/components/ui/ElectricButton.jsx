import React from "react";

export default function ElectricButton({
    children,
    type = "button",
    variant = "primary", // Options: primary, secondary, danger, ghost
    size = "md",         // Options: sm, md, lg
    isLoading = false,
    disabled = false,
    className = "",
    onClick,
    ...props
}) {
    // 1. BASE STYLES: Hardware-accelerated transitions & instant physical feedback (active:scale-95)
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide rounded-xl transition-all duration-200 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none";

    // 2. SIZE DICTIONARY: Keeps spacing proportional
    const sizes = {
        sm: "px-3 py-1.5 text-xs gap-1.5",
        md: "px-5 py-2.5 text-sm gap-2",
        lg: "px-8 py-3.5 text-base gap-2",
    };

    // 3. VARIANT DICTIONARY: Connected to your CSS Single Source of Truth
    const variants = {
        // 10% Accent Color + Glow
        primary: "bg-electric text-white hover:bg-blue-400 hover:electric-shadow",

        // 30% Secondary Color (Deep Blue Glass)
        secondary: "glass-panel text-slate-200 hover:text-white border-moon-800 hover:border-moon-800/80",

        // Destructive Actions
        danger: "bg-rose-600 text-white hover:bg-rose-500 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]",

        // Invisible until hovered (great for subtle actions)
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-moon-800/50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Loading Spinner: Shows instantly when isLoading is true */}
            {isLoading && (
                <svg
                    className="w-4 h-4 animate-spin shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}

            {/* Button Content */}
            {children}
        </button>
    );
}