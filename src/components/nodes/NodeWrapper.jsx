// // // // import { motion } from 'framer-motion';
// // // // import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// // // // // 1. The Physics Dictionary
// // // // // Defines exactly what the AI's text commands mathematically mean in Framer Motion.
// // // // // You can add as many new animations here as you want in the future.
// // // // const ANIMATION_REGISTRY = {
// // // //     pulse: { scale: [1, 1.05, 1] },
// // // //     breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
// // // //     shake: { x: [0, -8, 8, -8, 8, 0] },
// // // //     float: { y: [0, -10, 0] },
// // // //     slideIn: { x: [-50, 0], opacity: [0, 1] },
// // // //     none: {} // Idle state
// // // // };

// // // // export default function NodeWrapper({
// // // //     id,
// // // //     data,
// // // //     selected,
// // // //     children,
// // // //     minWidth = 60,
// // // //     minHeight = 40
// // // // }) {
// // // //     const { updateNodeData } = useReactFlow();

// // // //     // 2. The Animation State Engine
// // // //     // Check if the user turned off animations manually
// // // //     const isAnimationDisabled = data.disableAnimation === true;

// // // //     // Extract AI animation instructions safely
// // // //     const framerConfig = data.framerConfig || {};
// // // //     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || 'none');

// // // //     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;
// // // //     const duration = framerConfig.duration || 2;
// // // //     const shouldRepeat = framerConfig.repeat ? Infinity : 0;

// // // //     // 3. The Kill-Switch Trigger
// // // //     const toggleAnimation = () => {
// // // //         updateNodeData(id, { disableAnimation: !isAnimationDisabled });
// // // //     };

// // // //     // 4. Spatial Container Logic
// // // //     // If the AI designates this as a background boundary box, push it behind everything else
// // // //     const isContainer = data.width && data.height && !data.shapeType;

// // // //     return (
// // // //         <div
// // // //             // THE INDUSTRY STANDARD FIX: Enforce rigid CSS boundaries so the Resizer never calculates negative values
// // // //             style={{
// // // //                 width: '100%',
// // // //                 height: '100%',
// // // //                 minWidth: `${minWidth}px`,
// // // //                 minHeight: `${minHeight}px`,
// // // //                 zIndex: isContainer ? -1 : 1, // Pushes containers to the background so they don't block clicks
// // // //                 pointerEvents: isContainer ? 'none' : 'auto'
// // // //             }}
// // // //             className="relative"
// // // //         >
// // // //             {/* THE FLOATING MENU (Kill Switch) */}
// // // //             <NodeToolbar
// // // //                 isVisible={selected}
// // // //                 position="top"
// // // //                 className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto"
// // // //             >
// // // //                 <button
// // // //                     onClick={toggleAnimation}
// // // //                     className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled
// // // //                             ? 'bg-rose-950 text-rose-400 hover:bg-rose-900'
// // // //                             : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
// // // //                         }`}
// // // //                     title="Toggle AI Animations"
// // // //                 >
// // // //                     {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
// // // //                 </button>
// // // //             </NodeToolbar>

// // // //             {/* THE "MS PAINT" RESIZER */}
// // // //             {/* Automatically attaches to the React Flow node bounding box when clicked */}
// // // //             <NodeResizer
// // // //                 color="#3b82f6"
// // // //                 isVisible={selected}
// // // //                 minWidth={minWidth}
// // // //                 minHeight={minHeight}
// // // //                 handleStyle={{ width: 8, height: 8, borderRadius: 4 }} // Sleeker, modern drag handles
// // // //                 lineStyle={{ borderWidth: 2 }}
// // // //             />

// // // //             {/* THE PHYSICS SHELL */}
// // // //             <motion.div
// // // //                 initial={{ opacity: 0, scale: 0.8 }}
// // // //                 animate={{ opacity: 1, scale: 1, ...activeAnimation }}
// // // //                 transition={{
// // // //                     // Snappy entry bounce when the node spawns
// // // //                     type: 'spring',
// // // //                     stiffness: 300,
// // // //                     damping: 20,
// // // //                     // Continuous loop physics if the AI applied an animation
// // // //                     ...(animType !== 'none' && {
// // // //                         duration: duration,
// // // //                         repeat: shouldRepeat,
// // // //                         repeatType: "reverse",
// // // //                         ease: "easeInOut"
// // // //                     })
// // // //                 }}
// // // //                 className="w-full h-full relative"
// // // //             >
// // // //                 {/* The Dumb Component (like your CSS ShapeNode) gets injected perfectly inside this protected shell */}
// // // //                 {children}
// // // //             </motion.div>
// // // //         </div>
// // // //     );
// // // // }

// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// // // // 1. The Physics Dictionary
// // // const ANIMATION_REGISTRY = {
// // //     pulse: { scale: [1, 1.05, 1] },
// // //     breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
// // //     shake: { x: [0, -8, 8, -8, 8, 0] },
// // //     float: { y: [0, -10, 0] },
// // //     slideIn: { x: [-50, 0], opacity: [0, 1] },
// // //     // Explicitly reset all transform values so a killed animation snaps back to origin perfectly
// // //     none: { scale: 1, x: 0, y: 0, opacity: 1 }
// // // };

// // // export default function NodeWrapper({
// // //     id,
// // //     data,
// // //     selected,
// // //     children,
// // //     minWidth = 60,
// // //     minHeight = 40,
// // //     defaultAnimation = 'none'
// // // }) {
// // //     const { updateNodeData } = useReactFlow();

// // //     // 2. State Resolution
// // //     const isAnimationDisabled = data.disableAnimation === true;
// // //     const framerConfig = data.framerConfig || {};

// // //     // Hierarchy of rules: Kill Switch > AI Instruction > Component Default
// // //     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || defaultAnimation);
// // //     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;

// // //     const duration = framerConfig.duration || 2;
// // //     const shouldRepeat = framerConfig.repeat !== undefined ? (framerConfig.repeat ? Infinity : 0) : Infinity;

// // //     const toggleAnimation = () => {
// // //         updateNodeData(id, { disableAnimation: !isAnimationDisabled });
// // //     };

// // //     const isContainer = data.width && data.height && !data.shapeType;

// // //     // 3. Dynamic Sizing Logic
// // //     const containerWidth = data.width ? data.width : minWidth;
// // //     const containerHeight = data.height ? data.height : minHeight

// // //     console.log(containerHeight)

// // //     return (
// // //         <div
// // //             style={{
// // //                 width: containerWidth,
// // //                 height: containerHeight,
// // //                 minWidth: `${minWidth}px`,
// // //                 minHeight: `${minHeight}px`,
// // //                 zIndex: isContainer ? -1 : 1,
// // //                 pointerEvents: isContainer ? 'none' : 'auto'
// // //             }}
// // //             className="relative"
// // //         >
// // //             <NodeToolbar
// // //                 isVisible={selected}
// // //                 position="top"
// // //                 className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto"
// // //             >
// // //                 <button
// // //                     onClick={toggleAnimation}
// // //                     className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled
// // //                             ? 'bg-rose-950 text-rose-400 hover:bg-rose-900'
// // //                             : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
// // //                         }`}
// // //                 >
// // //                     {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
// // //                 </button>
// // //             </NodeToolbar>

// // //             <NodeResizer
// // //                 color="#3b82f6"
// // //                 isVisible={selected}
// // //                 minWidth={minWidth}
// // //                 minHeight={minHeight}
// // //                 handleStyle={{ width: 8, height: 8, borderRadius: 4 }}
// // //                 lineStyle={{ borderWidth: 2 }}
// // //             />

// // //             <motion.div
// // //                 // THE MEMORY FLUSH: Changing the key forces React to nuke the old DOM node and mount a fresh one, killing the infinite loop instantly.
// // //                 key={isAnimationDisabled ? 'frozen' : 'animated'}
// // //                 initial={{ opacity: 0, scale: 0.8 }}
// // //                 animate={{ opacity: 1, scale: 1, ...activeAnimation }}
// // //                 transition={{
// // //                     type: 'spring',
// // //                     stiffness: 300,
// // //                     damping: 20,
// // //                     // Only apply repeating physics if the switch is ON and an animation is selected
// // //                     ...(!isAnimationDisabled && animType !== 'none' && {
// // //                         duration: duration,
// // //                         repeat: shouldRepeat,
// // //                         repeatType: "reverse",
// // //                         ease: "easeInOut"
// // //                     })
// // //                 }}
// // //                 className="w-full h-full relative"
// // //             >
// // //                 {children}
// // //             </motion.div>
// // //         </div>
// // //     );
// // // }


// // // // // import React from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// // // // // // 1. The Physics Dictionary
// // // // // const ANIMATION_REGISTRY = {
// // // // //     pulse: { scale: [1, 1.05, 1] },
// // // // //     breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
// // // // //     shake: { x: [0, -8, 8, -8, 8, 0] },
// // // // //     float: { y: [0, -10, 0] },
// // // // //     slideIn: { x: [-50, 0], opacity: [0, 1] },
// // // // //     none: {} // Idle state
// // // // // };

// // // // // export default function NodeWrapper({
// // // // //     id,
// // // // //     data,
// // // // //     selected,
// // // // //     children,
// // // // //     minWidth = 60,
// // // // //     minHeight = 40,
// // // // //     defaultAnimation = 'none' // THE FIX: Default animation controller
// // // // // }) {
// // // // //     const { updateNodeData } = useReactFlow();

// // // // //     const isAnimationDisabled = data.disableAnimation === true;

// // // // //     // THE FIX: If the AI doesn't specify an animation, run the component's default
// // // // //     const framerConfig = data.framerConfig || {};
// // // // //     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || defaultAnimation);

// // // // //     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;
// // // // //     const duration = framerConfig.duration || 2;
// // // // //     const shouldRepeat = framerConfig.repeat !== undefined ? (framerConfig.repeat ? Infinity : 0) : Infinity;

// // // // //     const toggleAnimation = () => {
// // // // //         updateNodeData(id, { disableAnimation: !isAnimationDisabled });
// // // // //     };

// // // // //     const isContainer = data.width && data.height && !data.shapeType;

// // // // //     return (
// // // // //         <div
// // // // //             style={{
// // // // //                 width: '100%',
// // // // //                 height: '100%',
// // // // //                 minWidth: `${minWidth}px`,
// // // // //                 minHeight: `${minHeight}px`,
// // // // //                 zIndex: isContainer ? -1 : 1,
// // // // //                 pointerEvents: isContainer ? 'none' : 'auto'
// // // // //             }}
// // // // //             className="relative"
// // // // //         >
// // // // //             <NodeToolbar
// // // // //                 isVisible={selected}
// // // // //                 position="top"
// // // // //                 className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto"
// // // // //             >
// // // // //                 <button
// // // // //                     onClick={toggleAnimation}
// // // // //                     className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled
// // // // //                         ? 'bg-rose-950 text-rose-400 hover:bg-rose-900'
// // // // //                         : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
// // // // //                         }`}
// // // // //                     title="Toggle AI Animations"
// // // // //                 >
// // // // //                     {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
// // // // //                 </button>
// // // // //             </NodeToolbar>

// // // // //             <NodeResizer
// // // // //                 color="#3b82f6"
// // // // //                 isVisible={selected}
// // // // //                 minWidth={minWidth}
// // // // //                 minHeight={minHeight}
// // // // //                 handleStyle={{ width: 8, height: 8, borderRadius: 4 }}
// // // // //                 lineStyle={{ borderWidth: 2 }}
// // // // //             />

// // // // //             <motion.div
// // // // //                 initial={{ opacity: 0, scale: 0.8 }}
// // // // //                 animate={{ opacity: 1, scale: 1, ...activeAnimation }}
// // // // //                 transition={{
// // // // //                     type: 'spring',
// // // // //                     stiffness: 300,
// // // // //                     damping: 20,
// // // // //                     ...(animType !== 'none' && {
// // // // //                         duration: duration,
// // // // //                         repeat: shouldRepeat,
// // // // //                         repeatType: "reverse",
// // // // //                         ease: "easeInOut"
// // // // //                     })
// // // // //                 }}
// // // // //                 className="w-full h-full relative"
// // // // //             >
// // // // //                 {children}
// // // // //             </motion.div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// // const ANIMATION_REGISTRY = {
// //     pulse: { scale: [1, 1.05, 1] },
// //     breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
// //     shake: { x: [0, -8, 8, -8, 8, 0] },
// //     float: { y: [0, -10, 0] },
// //     slideIn: { x: [-50, 0], opacity: [0, 1] },
// //     none: { scale: 1, x: 0, y: 0, opacity: 1 }
// // };

// // export default function NodeWrapper({
// //     id,
// //     data,
// //     selected,
// //     children,
// //     minWidth = 60,
// //     minHeight = 40,
// //     defaultAnimation = 'none'
// // }) {
// //     const { updateNodeData } = useReactFlow();

// //     const isAnimationDisabled = data.disableAnimation === true;
// //     const framerConfig = data.framerConfig || {};

// //     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || defaultAnimation);
// //     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;

// //     const duration = framerConfig.duration || 2;
// //     const shouldRepeat = framerConfig.repeat !== undefined ? (framerConfig.repeat ? Infinity : 0) : Infinity;

// //     const toggleAnimation = () => {
// //         updateNodeData(id, { disableAnimation: !isAnimationDisabled });
// //     };

// //     const isContainer = data.width && data.height && !data.shapeType;

// //     // THE FIX: We map AI-generated sizes to the Minimum bounds, allowing the shape to spawn at the correct size
// //     const finalMinWidth = data.width ? data.width : minWidth;
// //     const finalMinHeight = data.height ? data.height : minHeight;

// //     return (
// //         <div
// //             style={{
// //                 // THE FIX: Always demand 100% of the React Flow engine's bounding box. 
// //                 // This forces the HTML shape to stretch perfectly when the blue handles are dragged.
// //                 width: '100%',
// //                 height: '100%',
// //                 minWidth: `${finalMinWidth}px`,
// //                 minHeight: `${finalMinHeight}px`,
// //                 zIndex: isContainer ? -1 : 1,
// //                 pointerEvents: isContainer ? 'none' : 'auto'
// //             }}
// //             className="relative"
// //         >
// //             <NodeToolbar
// //                 isVisible={selected}
// //                 position="top"
// //                 className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto"
// //             >
// //                 <button
// //                     onClick={toggleAnimation}
// //                     className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled
// //                             ? 'bg-rose-950 text-rose-400 hover:bg-rose-900'
// //                             : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
// //                         }`}
// //                     title="Toggle AI Animations"
// //                 >
// //                     {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
// //                 </button>
// //             </NodeToolbar>

// //             <NodeResizer
// //                 color="#3b82f6"
// //                 isVisible={selected}
// //                 minWidth={finalMinWidth}
// //                 minHeight={finalMinHeight}
// //                 handleStyle={{ width: 8, height: 8, borderRadius: 4 }}
// //                 lineStyle={{ borderWidth: 2 }}
// //             />

// //             <motion.div
// //                 key={isAnimationDisabled ? 'frozen' : 'animated'}
// //                 initial={isContainer ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
// //                 animate={isContainer ? { opacity: 1 } : { opacity: 1, scale: 1, ...activeAnimation }}
// //                 transition={{
// //                     type: 'spring',
// //                     stiffness: 300,
// //                     damping: 20,
// //                     ...(!isAnimationDisabled && animType !== 'none' && !isContainer && {
// //                         duration: duration,
// //                         repeat: shouldRepeat,
// //                         repeatType: "reverse",
// //                         ease: "easeInOut"
// //                     })
// //                 }}
// //                 className="w-full h-full relative"
// //             >
// //                 {children}
// //             </motion.div>
// //         </div>
// //     );
// // }

// import React from 'react';
// import { motion } from 'framer-motion';
// import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// const ANIMATION_REGISTRY = {
//     pulse: { scale: [1, 1.05, 1] },
//     breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
//     shake: { x: [0, -8, 8, -8, 8, 0] },
//     float: { y: [0, -10, 0] },
//     slideIn: { x: [-50, 0], opacity: [0, 1] },
//     none: { scale: 1, x: 0, y: 0, opacity: 1 }
// };

// export default function NodeWrapper({
//     id,
//     data,
//     selected,
//     children,
//     minWidth = 60,
//     minHeight = 40,
//     defaultAnimation = 'none',
//     isContainer = false // Explicit flag for z-index routing
// }) {
//     const { updateNodeData } = useReactFlow();

//     const isAnimationDisabled = data.disableAnimation === true;
//     const framerConfig = data.framerConfig || {};

//     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || defaultAnimation);
//     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;

//     const duration = framerConfig.duration || 2;
//     const shouldRepeat = framerConfig.repeat !== undefined ? (framerConfig.repeat ? Infinity : 0) : Infinity;

//     const toggleAnimation = () => {
//         updateNodeData(id, { disableAnimation: !isAnimationDisabled });
//     };

//     return (
//         <>
//             <NodeToolbar
//                 isVisible={selected}
//                 position="top"
//                 className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto z-50"
//             >
//                 <button
//                     onClick={toggleAnimation}
//                     className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled ? 'bg-rose-950 text-rose-400 hover:bg-rose-900' : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
//                         }`}
//                 >
//                     {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
//                 </button>
//             </NodeToolbar>

//             {/* INDUSTRY STANDARD: Thinner, elegant 1px borders with sharp small square handles */}
//             <NodeResizer
//                 color="#3b82f6"
//                 isVisible={selected}
//                 minWidth={minWidth}
//                 minHeight={minHeight}
//                 handleStyle={{ width: 6, height: 6, borderRadius: 1, backgroundColor: '#3b82f6', border: 'none' }}
//                 lineStyle={{ borderWidth: 1, borderColor: '#3b82f6' }}
//             />

//             {/* THE FIX: `flex` and `w-full h-full` forces everything inside to stretch to the blue lines */}
//             <div
//                 className="w-full h-full min-w-full min-h-full flex relative"
//                 style={{ zIndex: isContainer ? -10 : 1 }}
//             >
//                 <motion.div
//                     key={isAnimationDisabled ? 'frozen' : 'animated'}
//                     initial={isContainer ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
//                     animate={isContainer ? { opacity: 1 } : { opacity: 1, scale: 1, ...activeAnimation }}
//                     transition={{
//                         type: 'spring',
//                         stiffness: 300,
//                         damping: 20,
//                         ...(!isAnimationDisabled && animType !== 'none' && !isContainer && {
//                             duration: duration,
//                             repeat: shouldRepeat,
//                             repeatType: "reverse",
//                             ease: "easeInOut"
//                         })
//                     }}
//                     // THE FIX: `flex-1` forces the motion shell to stretch to the absolute bottom of the resizer box
//                     className="w-full flex-1 flex flex-col relative"
//                 >
//                     {children}
//                 </motion.div>
//             </div>
//         </>
//     );
// }

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