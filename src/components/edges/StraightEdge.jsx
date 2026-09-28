// // // import { BaseEdge, getStraightPath } from '@xyflow/react';

// // // export default function StraightEdge({
// // //     id,
// // //     sourceX,
// // //     sourceY,
// // //     targetX,
// // //     targetY,
// // //     style = {},
// // //     animated,
// // //     markerEnd
// // // }) {
// // //     // 1. The Math: Calculates a direct, straight line from Point A to Point B
// // //     const [edgePath] = getStraightPath({
// // //         sourceX,
// // //         sourceY,
// // //         targetX,
// // //         targetY,
// // //     });

// // //     return (
// // //         <BaseEdge
// // //             id={id}
// // //             path={edgePath}
// // //             markerEnd={markerEnd}
// // //             style={{
// // //                 ...style,
// // //                 strokeWidth: 2,
// // //                 stroke: '#cbd5e1', // Clean slate color
// // //             }}
// // //             // Framer motion/CSS animation support for kinetic lines
// // //             className={animated ? 'react-flow__edge-path animate-pulse' : 'react-flow__edge-path'}
// // //         />
// // //     );
// // // }

// // import { BaseEdge, getStraightPath, MarkerType } from '@xyflow/react';

// // export default function StraightEdge({ id, sourceX, sourceY, targetX, targetY, style = {}, animated, markerEnd }) {
// //     const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

// //     const activeMarkerEnd = markerEnd || {
// //         type: MarkerType.ArrowClosed,
// //         width: 20,
// //         height: 20,
// //         color: '#cbd5e1'
// //     };

// //     return (
// //         <BaseEdge
// //             id={id}
// //             path={edgePath}
// //             markerEnd={activeMarkerEnd}
// //             style={{ ...style, strokeWidth: 2, stroke: '#cbd5e1' }}
// //             className={animated ? 'react-flow__edge-path animate-pulse' : 'react-flow__edge-path'}
// //         />
// //     );
// // }

// import { BaseEdge, getStraightPath, MarkerType } from '@xyflow/react';

// export default function StraightEdge({ id, sourceX, sourceY, targetX, targetY, style = {}, animated, markerEnd }) {
//     const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

//     const safeMarkerEnd = markerEnd || {
//         type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#cbd5e1'
//     };

//     return (
//         <BaseEdge
//             id={id} path={edgePath} markerEnd={safeMarkerEnd}
//             style={{ ...style, strokeWidth: 2, stroke: '#cbd5e1' }}
//             className={animated ? 'react-flow__edge-path animate-pulse' : 'react-flow__edge-path'}
//         />
//     );
// }

import React from 'react';
import { BaseEdge, getStraightPath, MarkerType, useInternalNode } from '@xyflow/react';

export default function StraightEdge({
    id, source, sourceX, sourceY, targetX, targetY, style = {}, animated, markerEnd, data = {}
}) {
    const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

    // The Smart Sensor
    const sourceNode = useInternalNode(source);
    const isSourceActive = sourceNode?.data?.value === true || sourceNode?.data?.isActive === true;
    const isAnimated = animated || data.animated === true || isSourceActive;

    const safeMarkerEnd = markerEnd || {
        type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#cbd5e1'
    };

    return (
        <BaseEdge
            id={id} path={edgePath} markerEnd={safeMarkerEnd}
            style={{ ...style, strokeWidth: 2, stroke: '#cbd5e1' }}
            className={`react-flow__edge-path ${isAnimated ? 'animate-pulse' : ''}`}
        />
    );
}