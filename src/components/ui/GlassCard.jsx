import React from "react";

export default function GlassCard({
    children,
    variant = "default", // Options: default, interactive, glowing
    padding = "md",      // Options: none, sm, md, lg
    className = "",
    onClick,
    ...props
}) {
    // 1. BASE STYLES: 
    // Connected to index.css SSOT. 'overflow-hidden' ensures internal gradients don't break the rounded corners.
    const baseStyles = "relative glass-panel rounded-3xl overflow-hidden transition-all duration-300 ease-out";

    // 2. PADDING DICTIONARY: 
    // Enforces consistent spacing across the entire application without guessing Tailwind classes.
    const paddings = {
        none: "p-0",
        sm: "p-4",
        md: "p-6 sm:p-8",  // Scales up gracefully on larger screens
        lg: "p-8 sm:p-12",
    };

    // 3. VARIANT DICTIONARY: 
    // Hardware-accelerated GPU animations (transform, scale) to mask latency on interactive elements.
    const variants = {
        // Standard layout container
        default: "",

        // For Dashboard Workspace Cards: Floats up and glows when hovered, clicks in instantly
        interactive: "cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_15px_40px_var(--color-electric-glow)] active:scale-[0.98]",

        // For Featured/Active items: Constant electric glow
        glowing: "electric-shadow border-blue-500/30",
    };

    return (
        <div
            onClick={onClick}
            className={`${baseStyles} ${paddings[padding]} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* 
        Optional Abstract Inner Glow: 
        We add a very faint top-left gradient inside the card to give the glass a 3D light-catching effect. 
      */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}