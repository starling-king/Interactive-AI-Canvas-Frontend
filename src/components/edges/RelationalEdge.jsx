// // // import React from 'react';
// // // import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';

// // // export default function RelationalEdge({
// // //     id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, label
// // // }) {
// // //     const [edgePath, labelX, labelY] = getSmoothStepPath({
// // //         sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
// // //     });

// // //     return (
// // //         <>
// // //             <BaseEdge
// // //                 id={id}
// // //                 path={edgePath}
// // //                 markerEnd={markerEnd}
// // //                 style={{
// // //                     ...style,
// // //                     strokeWidth: 2,
// // //                     stroke: '#94a3b8', // slate-400
// // //                     strokeDasharray: '6, 6', // THE FIX: This makes the line dashed
// // //                 }}
// // //             />
// // //             {label && (
// // //                 <EdgeLabelRenderer>
// // //                     <div
// // //                         style={{
// // //                             position: 'absolute',
// // //                             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
// // //                             pointerEvents: 'all',
// // //                         }}
// // //                         className="nodrag nopan bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase"
// // //                     >
// // //                         {label}
// // //                     </div>
// // //                 </EdgeLabelRenderer>
// // //             )}
// // //         </>
// // //     );
// // // }

// // import React from 'react';
// // import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, MarkerType } from '@xyflow/react';

// // export default function RelationalEdge({
// //     id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, label
// // }) {
// //     const [edgePath, labelX, labelY] = getSmoothStepPath({
// //         sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
// //     });

// //     const activeMarkerEnd = markerEnd || {
// //         type: MarkerType.ArrowClosed,
// //         width: 20,
// //         height: 20,
// //         color: '#94a3b8'
// //     };

// //     return (
// //         <>
// //             <BaseEdge
// //                 id={id}
// //                 path={edgePath}
// //                 markerEnd={activeMarkerEnd}
// //                 style={{ ...style, strokeWidth: 2, stroke: '#94a3b8', strokeDasharray: '6, 6' }}
// //             />
// //             {label && (
// //                 <EdgeLabelRenderer>
// //                     <div
// //                         style={{
// //                             position: 'absolute',
// //                             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
// //                             pointerEvents: 'all',
// //                         }}
// //                         className="nodrag nopan bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase"
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

// export default function RelationalEdge({
//     id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, label
// }) {
//     const [edgePath, labelX, labelY] = getSmoothStepPath({
//         sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
//     });

//     const safeMarkerEnd = markerEnd || {
//         type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#94a3b8'
//     };

//     return (
//         <>
//             <BaseEdge id={id} path={edgePath} markerEnd={safeMarkerEnd} style={{ ...style, strokeWidth: 2, stroke: '#94a3b8', strokeDasharray: '6, 6' }} />
//             {label && (
//                 <EdgeLabelRenderer>
//                     <div style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, pointerEvents: 'all' }} className="nodrag nopan bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase">
//                         {label}
//                     </div>
//                 </EdgeLabelRenderer>
//             )}
//         </>
//     );
// }

import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, MarkerType, useInternalNode } from '@xyflow/react';

export default function RelationalEdge({
    id, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, label, animated, data = {}
}) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
    });

    // The Smart Sensor
    const sourceNode = useInternalNode(source);
    const isSourceActive = sourceNode?.data?.value === true || sourceNode?.data?.isActive === true;
    const isAnimated = animated || data.animated === true || isSourceActive;

    const safeMarkerEnd = markerEnd || {
        type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#94a3b8'
    };

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={safeMarkerEnd}
                style={{ ...style, strokeWidth: 2, stroke: '#94a3b8', strokeDasharray: '6, 6' }}
                className={`react-flow__edge-path ${isAnimated ? 'animate-pulse' : ''}`}
            />
            {label && (
                <EdgeLabelRenderer>
                    <div style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, pointerEvents: 'all' }} className="nodrag nopan bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase">
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}