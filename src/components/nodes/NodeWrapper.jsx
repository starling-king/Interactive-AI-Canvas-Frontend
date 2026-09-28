import React from 'react';
import { motion } from 'framer-motion';
import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// 1. THE PHYSICS DICTIONARY
// This defines exactly what the AI's text commands mathematically mean.
// It also provides the default animations for your nodes.
const ANIMATION_REGISTRY = {
    pulse: { scale: [1, 1.05, 1] },
    breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
    shake: { x: [0, -8, 8, -8, 8, 0] },
    float: { y: [0, -10, 0] },
    slideIn: { x: [-50, 0], opacity: [0, 1] },
    none: { scale: 1, x: 0, y: 0, opacity: 1 }
};

export default function NodeWrapper({
    id,
    data,
    selected,
    children,
    minWidth = 60,
    minHeight = 40,
    defaultAnimation = 'none',
    isContainer = false
}) {
    const { updateNodeData } = useReactFlow();

    // 2. THE ANIMATION ENGINE
    // Check if the user manually clicked the "Anim: OFF" kill-switch
    const isAnimationDisabled = data.disableAnimation === true;

    // AI Configuration overrides the default, but the Kill Switch overrides everything
    const framerConfig = data.framerConfig || {};
    const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || defaultAnimation);

    // Fallback to 'none' if the AI hallucinates an animation name that doesn't exist
    const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;

    const duration = framerConfig.duration || 2;
    const shouldRepeat = framerConfig.repeat !== undefined ? (framerConfig.repeat ? Infinity : 0) : Infinity;

    // 3. THE KILL SWITCH
    // Toggles the animation state and pushes it to your Zustand global store
    const toggleAnimation = () => {
        updateNodeData(id, { disableAnimation: !isAnimationDisabled });
    };

    return (
        // We use a React Fragment (<>) so we don't accidentally break React Flow's outer DOM wrapper
        <>
            {/* 4. THE FLOATING MENU */}
            <NodeToolbar
                isVisible={selected}
                position="top"
                className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto z-50"
            >
                <button
                    onClick={toggleAnimation}
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled ? 'bg-rose-950 text-rose-400 hover:bg-rose-900' : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
                        }`}
                    title="Toggle Node Physics"
                >
                    {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
                </button>
            </NodeToolbar>

            {/* 5. THE RESIZER (The Blue Box) */}
            {/* THE FIX: We pass the STATIC minWidth. This prevents the "magical growing box" bug. */}
            <NodeResizer
                color="#3b82f6"
                isVisible={selected}
                minWidth={minWidth}
                minHeight={minHeight}
                // Industry Standard UX: Sleek, tiny 6px square handles instead of bulky circles
                handleStyle={{ width: 6, height: 6, borderRadius: '2px', backgroundColor: '#3b82f6', border: 'none' }}
                lineStyle={{ borderWidth: 1, borderColor: '#3b82f6' }}
            />

            {/* 6. THE STRUCTURAL BOUNDARY */}
            <div
                style={{
                    // Enforce the floor limit, but let it grow if content overflows
                    minWidth: `${minWidth}px`,
                    minHeight: `${minHeight}px`,
                    // Containers go to the back (-10) so they don't block clicks on nodes inside them
                    zIndex: isContainer ? -10 : 1,
                }}
                className="w-full h-full flex flex-col relative"
            >
                {/* 7. THE MOTION SHELL */}
                {/* THE FIX: `key` forces React to completely rebuild the DOM node if animation is toggled, wiping out leftover momentum */}
                <motion.div
                    key={isAnimationDisabled ? 'frozen' : 'animated'}
                    initial={isContainer ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                    animate={isContainer ? { opacity: 1 } : { opacity: 1, scale: 1, ...activeAnimation }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        // Only loop the physics if it's explicitly turned on and not a static container
                        ...(!isAnimationDisabled && animType !== 'none' && !isContainer && {
                            duration: duration,
                            repeat: shouldRepeat,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        })
                    }}
                    // `flex-1 w-full h-full` forces the shape to stretch to the blue resizer lines perfectly
                    className="w-full h-full flex-1 flex flex-col relative"
                >
                    {/* The specific UI (Database Table, Interactive Sliders, CSS Shapes) renders safely inside here */}
                    {children}
                </motion.div>
            </div>
        </>
    );
}