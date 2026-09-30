import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import ElectricButton from '../components/ui/ElectricButton';

export default function Documentation() {
    return (
        // THE FIX: Increased pt-24 to pt-40 (and lg:pt-48) to completely clear your fixed Navigation Header
        <div className="min-h-screen bg-moon-950 bg-abstract-glow text-slate-100 p-6 sm:p-12 font-sans overflow-x-hidden pt-40 lg:pt-48">

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="space-y-4 max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
                        Architecture <span className="text-electric">Strategy</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        The strategic playbook for our node-based visual engine. Built on cognitive ease, deep resilience, and a strict single source of truth.
                    </p>
                </header>

                {/* Asymmetrical Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column (Wider - 7 cols) */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* 30% Secondary Deep Blue represented via GlassCard variants */}
                        <GlassCard variant="glowing" padding="lg" className="h-full">
                            <h2 className="text-2xl font-display font-semibold mb-4">The Single Source of Truth</h2>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Fractured state is the enemy of a visual engine. We do not use local component state (`useState`) to buffer data inside nodes. Every keystroke, resize, and schema update is dispatched directly to the React Flow global store.
                                <br /><br />
                                <strong>Why?</strong> This guarantees perfect synchronicity between the UI, the AI Orchestrator, and the Undo/Redo Time Machine stack. If the state isn't global, it doesn't exist.
                            </p>
                            <div className="flex gap-4">
                                <ElectricButton variant="primary">View Data Flow</ElectricButton>
                            </div>
                        </GlassCard>

                        <GlassCard variant="default" padding="md">
                            <h3 className="text-xl font-display font-medium mb-4 text-electric">AI Orchestration Guardrails</h3>
                            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                                The AI is a powerful generator, but it must operate within strict physics to prevent canvas deadlocks and silent failures.
                            </p>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-electric shrink-0 electric-shadow" />
                                    <div>
                                        <strong className="text-slate-200">No Math Overrides:</strong>
                                        <p className="mt-1">The AI is forbidden from injecting raw JavaScript or built-in math keywords (like `sin`, `cos`, or `true`) into the MathEngine. It must use pure, predictable algebra to prevent parsing corruption.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-electric shrink-0 electric-shadow" />
                                    <div>
                                        <strong className="text-slate-200">Strict Connection Taxonomy:</strong>
                                        <p className="mt-1">Edges must route specifically to target and source ports. The AI cannot blindly connect to the center of a node. Visual logic flows from Left-to-Right or Top-to-Bottom by absolute rule.</p>
                                    </div>
                                </li>
                            </ul>
                        </GlassCard>
                    </div>

                    {/* Right Column (Narrower - 5 cols, floating offset for asymmetry) */}
                    <div className="lg:col-span-5 space-y-8 lg:mt-16">
                        <GlassCard variant="interactive" padding="md">
                            <h3 className="text-xl font-display font-medium mb-3 text-electric">System Resilience Vectors</h3>
                            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                                We engineer for the absolute worst-case user scenarios. The canvas must never crash, and data must never silently vanish.
                            </p>

                            <div className="space-y-4 text-sm text-slate-400">
                                <div className="p-4 rounded-xl bg-moon-900/50 border border-moon-800 transition-colors hover:border-electric/50">
                                    <span className="text-slate-200 font-mono font-bold block mb-1">Infinite Loop Prevention</span>
                                    Circular user connections (Node A → Node B → Node A) are intercepted before they cause recursive debounced calculations that would drop CPU frame rates to zero.
                                </div>
                                <div className="p-4 rounded-xl bg-moon-900/50 border border-moon-800 transition-colors hover:border-electric/50">
                                    <span className="text-slate-200 font-mono font-bold block mb-1">Graceful Math Degradation</span>
                                    If a user routes incomplete logic that causes a Division-by-Zero, the engine intercepts the `Infinity` output before it hits the UI layer, preventing React rendering crashes on tooltips.
                                </div>
                                <div className="p-4 rounded-xl bg-moon-900/50 border border-moon-800 transition-colors hover:border-electric/50">
                                    <span className="text-slate-200 font-mono font-bold block mb-1">Defocused Deletion Locks</span>
                                    Keyboard shortcut listeners dynamically check for active input focus. Hitting 'Backspace' outside an active field safely halts canvas deletion, preventing accidental data wipes.
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                </div>
            </div>
        </div>
    );
}