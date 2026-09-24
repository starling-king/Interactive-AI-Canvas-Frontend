// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { NodeResizer } from '@xyflow/react';

// // // 1. The Physics Dictionary
// // // Defines exactly what the AI's text commands mathematically mean in Framer Motion
// // const ANIMATION_REGISTRY = {
// //     pulse: { scale: [1, 1.05, 1] },
// //     breathe: { scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] },
// //     shake: { x: [0, -8, 8, -8, 8, 0] },
// //     float: { y: [0, -12, 0] },
// //     slideIn: { x: [-50, 0], opacity: [0, 1] },
// //     none: {}
// // };

// // export default function NodeWrapper({
// //     id,
// //     data,
// //     selected,
// //     children,
// //     minWidth = 80,
// //     minHeight = 40
// // }) {
// //     // 2. The Animation Kill-Switch
// //     // Allows the user to turn off chaotic AI animations via the NodeInspector
// //     const isAnimationDisabled = data.disableAnimation === true;

// //     // 3. Extract the AI's instructions (with safe fallbacks)
// //     const framerConfig = data.framerConfig || {};
// //     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || 'none');

// //     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;
// //     const duration = framerConfig.duration || 2;
// //     const shouldRepeat = framerConfig.repeat ? Infinity : 0;

// //     return (
// //         <>
// //             {/* THE "MS PAINT" RESIZER */}
// //             {/* This only appears when the user clicks the node. It lets them drag the edges. */}
// //             <NodeResizer
// //                 color="#3b82f6"
// //                 isVisible={selected}
// //                 minWidth={minWidth}
// //                 minHeight={minHeight}
// //             />

// //             {/* THE PHYSICS HOVERBOARD */}
// //             <motion.div
// //                 // Default Entry Animation (Happens once when the node is born)
// //                 initial={{ opacity: 0, scale: 0.8 }}
// //                 animate={{
// //                     opacity: 1,
// //                     scale: 1,
// //                     // Inject the continuous AI animation here
// //                     ...activeAnimation
// //                 }}
// //                 transition={{
// //                     // Physics properties for the entry spring
// //                     type: 'spring',
// //                     stiffness: 300,
// //                     damping: 20,
// //                     // Physics properties for the continuous loop
// //                     ...(animType !== 'none' && {
// //                         duration: duration,
// //                         repeat: shouldRepeat,
// //                         repeatType: "reverse",
// //                         ease: "easeInOut"
// //                     })
// //                 }}
// //                 className="w-full h-full relative"
// //             >
// //                 {/* THE "DUMB" DEAD COMPONENT GOES INSIDE HERE */}
// //                 {children}
// //             </motion.div>
// //         </>
// //     );
// // }


// import React from 'react';
// import { motion } from 'framer-motion';
// import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// // 1. The Physics Dictionary
// const ANIMATION_REGISTRY = {
//     pulse: { scale: [1, 1.05, 1] },
//     breathe: { scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] },
//     shake: { x: [0, -8, 8, -8, 8, 0] },
//     float: { y: [0, -12, 0] },
//     slideIn: { x: [-50, 0], opacity: [0, 1] },
//     none: {}
// };

// export default function NodeWrapper({ id, data, selected, children, minWidth = 80, minHeight = 40 }) {
//     const { updateNodeData } = useReactFlow();

//     const isAnimationDisabled = data.disableAnimation === true;
//     const framerConfig = data.framerConfig || {};
//     const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || 'none');

//     const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;
//     const duration = framerConfig.duration || 2;
//     const shouldRepeat = framerConfig.repeat ? Infinity : 0;

//     const toggleAnimation = () => {
//         updateNodeData(id, { disableAnimation: !isAnimationDisabled });
//     };

//     // If the AI designates this as a spatial container, we need to respect its custom size
//     const isContainer = data.width && data.height;

//     return (
//         <div
//             // THE INDUSTRY STANDARD FIX: Enforce rigid boundaries so NodeResizer never calculates negative SVG values
//             style={{
//                 width: isContainer ? `${data.width}px` : 'auto',
//                 height: isContainer ? `${data.height}px` : 'auto',
//                 minWidth: `${minWidth}px`,
//                 minHeight: `${minHeight}px`,
//                 zIndex: isContainer ? -1 : 1, // Pushes containers to the background so they don't block clicks
//                 pointerEvents: isContainer ? 'none' : 'auto'
//             }}
//             className="relative"
//         >
//             {/* THE FLOATING MENU */}
//             <NodeToolbar
//                 isVisible={selected}
//                 position="top"
//                 className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto"
//             >
//                 <button
//                     onClick={toggleAnimation}
//                     className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'
//                         }`}
//                 >
//                     {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
//                 </button>
//             </NodeToolbar>

//             {/* THE "MS PAINT" RESIZER */}
//             <NodeResizer
//                 color="#3b82f6"
//                 isVisible={selected}
//                 minWidth={minWidth}
//                 minHeight={minHeight}
//             />

//             {/* THE PHYSICS SHELL */}
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1, ...activeAnimation }}
//                 transition={{
//                     type: 'spring', stiffness: 300, damping: 20,
//                     ...(animType !== 'none' && { duration, repeat: shouldRepeat, repeatType: "reverse", ease: "easeInOut" })
//                 }}
//                 className="w-full h-full relative"
//             >
//                 {children}
//             </motion.div>
//         </div>
//     );
// }

import React from 'react';
import { motion } from 'framer-motion';
import { NodeResizer, NodeToolbar, useReactFlow } from '@xyflow/react';

// 1. The Physics Dictionary
// Defines exactly what the AI's text commands mathematically mean in Framer Motion.
// You can add as many new animations here as you want in the future.
const ANIMATION_REGISTRY = {
    pulse: { scale: [1, 1.05, 1] },
    breathe: { scale: [1, 1.03, 1], opacity: [0.75, 1, 0.75] },
    shake: { x: [0, -8, 8, -8, 8, 0] },
    float: { y: [0, -10, 0] },
    slideIn: { x: [-50, 0], opacity: [0, 1] },
    none: {} // Idle state
};

export default function NodeWrapper({
    id,
    data,
    selected,
    children,
    minWidth = 60,
    minHeight = 40
}) {
    const { updateNodeData } = useReactFlow();

    // 2. The Animation State Engine
    // Check if the user turned off animations manually
    const isAnimationDisabled = data.disableAnimation === true;

    // Extract AI animation instructions safely
    const framerConfig = data.framerConfig || {};
    const animType = isAnimationDisabled ? 'none' : (framerConfig.animationType || 'none');

    const activeAnimation = ANIMATION_REGISTRY[animType] || ANIMATION_REGISTRY.none;
    const duration = framerConfig.duration || 2;
    const shouldRepeat = framerConfig.repeat ? Infinity : 0;

    // 3. The Kill-Switch Trigger
    const toggleAnimation = () => {
        updateNodeData(id, { disableAnimation: !isAnimationDisabled });
    };

    // 4. Spatial Container Logic
    // If the AI designates this as a background boundary box, push it behind everything else
    const isContainer = data.width && data.height && !data.shapeType;

    return (
        <div
            // THE INDUSTRY STANDARD FIX: Enforce rigid CSS boundaries so the Resizer never calculates negative values
            style={{
                width: '100%',
                height: '100%',
                minWidth: `${minWidth}px`,
                minHeight: `${minHeight}px`,
                zIndex: isContainer ? -1 : 1, // Pushes containers to the background so they don't block clicks
                pointerEvents: isContainer ? 'none' : 'auto'
            }}
            className="relative"
        >
            {/* THE FLOATING MENU (Kill Switch) */}
            <NodeToolbar
                isVisible={selected}
                position="top"
                className="flex gap-2 p-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl pointer-events-auto"
            >
                <button
                    onClick={toggleAnimation}
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider transition-colors ${isAnimationDisabled
                            ? 'bg-rose-950 text-rose-400 hover:bg-rose-900'
                            : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
                        }`}
                    title="Toggle AI Animations"
                >
                    {isAnimationDisabled ? 'Anim: OFF' : 'Anim: ON'}
                </button>
            </NodeToolbar>

            {/* THE "MS PAINT" RESIZER */}
            {/* Automatically attaches to the React Flow node bounding box when clicked */}
            <NodeResizer
                color="#3b82f6"
                isVisible={selected}
                minWidth={minWidth}
                minHeight={minHeight}
                handleStyle={{ width: 8, height: 8, borderRadius: 4 }} // Sleeker, modern drag handles
                lineStyle={{ borderWidth: 2 }}
            />

            {/* THE PHYSICS SHELL */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, ...activeAnimation }}
                transition={{
                    // Snappy entry bounce when the node spawns
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    // Continuous loop physics if the AI applied an animation
                    ...(animType !== 'none' && {
                        duration: duration,
                        repeat: shouldRepeat,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    })
                }}
                className="w-full h-full relative"
            >
                {/* The Dumb Component (like your CSS ShapeNode) gets injected perfectly inside this protected shell */}
                {children}
            </motion.div>
        </div>
    );
}