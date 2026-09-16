import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';

export default function OrthogonalEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    label,
    animated
}) {
    // 1. The Math: Calculates the 90-degree turns with beautiful rounded corners (borderRadius: 20)
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 20, // This creates the Eraser.io smooth turns
    });

    return (
        <>
            {/* 2. The Line itself */}
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    strokeWidth: 2,
                    stroke: '#cbd5e1', // A clean slate color by default
                }}
                className={animated ? 'react-flow__edge-path animate-pulse' : 'react-flow__edge-path'}
            />
            
            {/* 3. The Label (e.g., "1 to N" or "True/False") */}
            {label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan bg-slate-800 text-slate-200 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-600 shadow-md"
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}