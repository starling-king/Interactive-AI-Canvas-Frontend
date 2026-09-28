// // // import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';

// // // export default function OrthogonalEdge({
// // //     id,
// // //     sourceX,
// // //     sourceY,
// // //     targetX,
// // //     targetY,
// // //     sourcePosition,
// // //     targetPosition,
// // //     style = {},
// // //     markerEnd,
// // //     label,
// // //     animated
// // // }) {
// // //     // 1. The Math: Calculates the 90-degree turns with beautiful rounded corners (borderRadius: 20)
// // //     const [edgePath, labelX, labelY] = getSmoothStepPath({
// // //         sourceX,
// // //         sourceY,
// // //         sourcePosition,
// // //         targetX,
// // //         targetY,
// // //         targetPosition,
// // //         borderRadius: 20, // This creates the Eraser.io smooth turns
// // //     });

// // //     return (
// // //         <>
// // //             {/* 2. The Line itself */}
// // //             <BaseEdge
// // //                 id={id}
// // //                 path={edgePath}
// // //                 markerEnd={markerEnd}
// // //                 style={{
// // //                     ...style,
// // //                     strokeWidth: 2,
// // //                     stroke: '#cbd5e1', // A clean slate color by default
// // //                 }}
// // //                 className={animated ? 'react-flow__edge-path animate-pulse' : 'react-flow__edge-path'}
// // //             />
            
// // //             {/* 3. The Label (e.g., "1 to N" or "True/False") */}
// // //             {label && (
// // //                 <EdgeLabelRenderer>
// // //                     <div
// // //                         style={{
// // //                             position: 'absolute',
// // //                             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
// // //                             pointerEvents: 'all',
// // //                         }}
// // //                         className="nodrag nopan bg-slate-800 text-slate-200 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-600 shadow-md"
// // //                     >
// // //                         {label}
// // //                     </div>
// // //                 </EdgeLabelRenderer>
// // //             )}
// // //         </>
// // //     );
// // // }

// // import React from 'react';
// // import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';

// // export default function OrthogonalEdge({
// //     id,
// //     sourceX,
// //     sourceY,
// //     targetX,
// //     targetY,
// //     sourcePosition,
// //     targetPosition,
// //     style = {},
// //     markerEnd,
// //     label,
// //     animated,
// //     selected, // EXTRACTED: This tells us if the user clicked the wire
// //     data = {} // EXTRACTED: This lets the AI/User pass custom animation flags
// // }) {
// //     // 1. THE PHYSICS OF THE WIRE
// //     // The 'offset' parameter forces the wire to push 30px straight out before bending.
// //     // This stops the wire from looping backward through the node (fixing the "back of canvas" bug).
// //     const [edgePath, labelX, labelY] = getSmoothStepPath({
// //         sourceX,
// //         sourceY,
// //         sourcePosition,
// //         targetX,
// //         targetY,
// //         targetPosition,
// //         borderRadius: 20,
// //         offset: 30, // THE FIX: Prevents backward clipping
// //     });

// //     // 2. SCALABLE ANIMATION ENGINE
// //     // AI or User can pass 'data.animated = true' to override the default static state.
// //     const isAnimated = animated || data.animated === true;

// //     // 3. SELECTION LOGIC
// //     // Changes color to Electric Blue when clicked so the user knows they can hit 'Delete'.
// //     const edgeColor = selected ? '#3b82f6' : (data.color || '#94a3b8');

// //     return (
// //         <>
// //             <BaseEdge
// //                 id={id}
// //                 path={edgePath}
// //                 markerEnd={markerEnd}
// //                 // THE FIX: interactionWidth creates an invisible 25px click-zone around the 2px wire.
// //                 // Without this, users can never precisely click the line to select and delete it.
// //                 interactionWidth={25}
// //                 style={{
// //                     ...style,
// //                     strokeWidth: selected ? 3 : 2,
// //                     stroke: edgeColor,
// //                     // Adds an Electric glow effect when selected
// //                     filter: selected ? 'drop-shadow(0 0 6px rgba(59,130,246,0.6))' : 'none',
// //                     transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
// //                 }}
// //                 // 'animated' is a native React Flow class that applies the flowing dash effect
// //                 className={`react-flow__edge-path ${isAnimated ? 'animated' : ''}`}
// //             />

// //             {/* 4. THE EDITABLE LABEL */}
// //             {label && (
// //                 <EdgeLabelRenderer>
// //                     <div
// //                         style={{
// //                             position: 'absolute',
// //                             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
// //                             // Ensures the label itself can be clicked/interacted with
// //                             pointerEvents: 'all',
// //                         }}
// //                         className={`nodrag nopan text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-xl transition-colors ${selected
// //                                 ? 'bg-blue-950/90 text-blue-300 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
// //                                 : 'bg-slate-900/90 text-slate-300 border-slate-700'
// //                             }`}
// //                     >
// //                         {label}
// //                     </div>
// //                 </EdgeLabelRenderer>
// //             )}
// //         </>
// //     );
// // }

// import React from 'react';
// import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, MarkerType } from '@xyflow/react';

// export default function OrthogonalEdge({
//     id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {},
//     markerEnd, label, animated, selected, data = {}
// }) {
//     // 1. Structural Path
//     const [edgePath, labelX, labelY] = getSmoothStepPath({
//         sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
//     });

//     // 2. Dynamic State
//     const isAnimated = animated || data.animated === true;
//     const edgeColor = selected ? '#3b82f6' : (data.colorTheme || '#94a3b8');

//     // 3. THE SMART HEALER: If the DB data is naked, we construct the arrowhead right here.
//     const safeMarkerEnd = markerEnd || {
//         type: MarkerType.ArrowClosed,
//         width: 20,
//         height: 20,
//         color: edgeColor,
//     };

//     return (
//         <>
//             <BaseEdge
//                 id={id}
//                 path={edgePath}
//                 markerEnd={safeMarkerEnd} // Feed the safe marker
//                 interactionWidth={25}
//                 style={{
//                     ...style,
//                     strokeWidth: selected ? 3 : 2,
//                     stroke: edgeColor,
//                     filter: selected ? 'drop-shadow(0 0 6px rgba(59,130,246,0.6))' : 'none',
//                     transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
//                 }}
//                 className={`react-flow__edge-path ${isAnimated ? 'animated' : ''}`}
//             />

//             {label && (
//                 <EdgeLabelRenderer>
//                     <div
//                         style={{
//                             position: 'absolute',
//                             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
//                             pointerEvents: 'all',
//                         }}
//                         className={`nodrag nopan text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-xl transition-colors ${selected
//                             ? 'bg-blue-950/90 text-blue-300 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
//                             : 'bg-slate-900/90 text-slate-300 border-slate-700'
//                             }`}
//                     >
//                         {label}
//                     </div>
//                 </EdgeLabelRenderer>
//             )}
//         </>
//     );
// }

import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, MarkerType, useInternalNode } from '@xyflow/react';

export default function OrthogonalEdge({
    id, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {},
    markerEnd, label, animated, selected, data = {}
}) {
    // 1. STRUCTURAL PATH: Generates the 90-degree lines with a 30px offset to prevent reverse looping
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
    });

    // 2. THE SMART SENSOR (Lateral Thinking)
    // We look directly at the node this wire is plugged into.
    const sourceNode = useInternalNode(source);

    // If the source node is a toggle switch and is ON, or explicitly marked active, the wire goes live.
    const isSourceActive = sourceNode?.data?.value === true || sourceNode?.data?.isActive === true;
    const isAnimated = animated || data.animated === true || isSourceActive;

    // 3. DYNAMIC THEMING
    const edgeColor = selected ? '#3b82f6' : (data.colorTheme || '#94a3b8');

    // 4. THE SMART MARKER
    const safeMarkerEnd = markerEnd || {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: edgeColor,
    };

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={safeMarkerEnd}
                interactionWidth={25} // Invisible click area so users can easily select the wire
                style={{
                    ...style,
                    strokeWidth: selected ? 3 : 2,
                    stroke: edgeColor,
                    filter: selected ? 'drop-shadow(0 0 6px rgba(59,130,246,0.6))' : 'none',
                    transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                }}
                className={`react-flow__edge-path ${isAnimated ? 'animate-pulse' : ''}`}
            />

            {label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className={`nodrag nopan text-[10px] font-bold px-2.5 py-1 rounded-md border shadow-xl transition-colors ${selected
                            ? 'bg-blue-950/90 text-blue-300 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                            : 'bg-slate-900/90 text-slate-300 border-slate-700'
                            }`}
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}