import { BaseEdge, getStraightPath } from '@xyflow/react';

export default function StraightEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    animated
}) {
    // 1. The Math: Calculates a direct, straight line from Point A to Point B
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <BaseEdge
            id={id}
            path={edgePath}
            // Notice: We completely removed markerEnd so there is no arrowhead
            style={{
                ...style,
                strokeWidth: 2,
                stroke: '#cbd5e1', // Clean slate color
            }}
            // Framer motion/CSS animation support for kinetic lines
            className={animated ? 'react-flow__edge-path animate-pulse' : 'react-flow__edge-path'}
        />
    );
}