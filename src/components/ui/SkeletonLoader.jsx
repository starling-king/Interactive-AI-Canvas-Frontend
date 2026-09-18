import React from "react";

export default function SkeletonLoader({
    type = "card", // Options: card, text, form, canvas
    count = 1,
    className = "",
}) {
    // 1. BASE STYLES: 
    // Ties directly to the SSOT. Uses moon-800 to blend with the 60% dominant void.
    const basePulse = "animate-pulse bg-moon-800 rounded-xl";

    // 2. RENDER HELPERS: 
    // Renders the requested number of skeletons (e.g., passing count={3} generates a grid of 3 cards).
    const renderItems = (element) => (
        <React.Fragment>
            {Array.from({ length: count }).map((_, i) => (
                <React.Fragment key={i}>{element}</React.Fragment>
            ))}
        </React.Fragment>
    );

    // 3. VARIANT DICTIONARY:
    const Skeletons = {
        // Mimics the asymmetrical Workspace Cards on the Dashboard
        card: (
            <div className={`p-6 glass-panel rounded-3xl space-y-4 ${className}`}>
                <div className="flex justify-between items-center">
                    <div className={`${basePulse} h-6 w-1/3`} />
                    <div className={`${basePulse} h-8 w-8 rounded-full`} />
                </div>
                <div className="space-y-2">
                    <div className={`${basePulse} h-3 w-3/4`} />
                    <div className={`${basePulse} h-3 w-1/2`} />
                </div>
                <div className="pt-4 flex gap-2">
                    <div className={`${basePulse} h-8 w-20`} />
                    <div className={`${basePulse} h-8 w-20`} />
                </div>
            </div>
        ),

        // Mimics paragraphs or block text
        text: (
            <div className={`space-y-3 ${className}`}>
                <div className={`${basePulse} h-4 w-full`} />
                <div className={`${basePulse} h-4 w-5/6`} />
                <div className={`${basePulse} h-4 w-4/6`} />
            </div>
        ),

        // Mimics the Profile Settings inputs
        form: (
            <div className={`space-y-6 ${className}`}>
                <div className="space-y-2">
                    <div className={`${basePulse} h-3 w-24`} />
                    <div className={`${basePulse} h-12 w-full`} />
                </div>
                <div className="space-y-2">
                    <div className={`${basePulse} h-3 w-32`} />
                    <div className={`${basePulse} h-12 w-full`} />
                </div>
            </div>
        ),

        // Mimics the central loading state of the React Flow Canvas
        canvas: (
            <div className={`w-full h-[60vh] flex flex-col items-center justify-center gap-6 ${className}`}>
                <div className="relative flex items-center justify-center w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-electric opacity-20 animate-ping" />
                    <div className={`${basePulse} bg-electric w-8 h-8 rounded-full shadow-[0_0_20px_var(--color-electric-glow)]`} />
                </div>
                <div className={`${basePulse} h-4 w-48`} />
            </div>
        ),
    };

    return renderItems(Skeletons[type] || Skeletons.card);
}