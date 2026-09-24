import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';

export default function KineticEdge({
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
    animated,
    data = {}
}) {
    // 1. Calculate the City-Street 90-degree path
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 20,
    });

    // 2. Determine Particle State
    // The AI passes 'animated: true' or 'data.animated' to trigger the flow
    const isKinetic = animated || data.animated;

    // The AI can dictate the color of the data flow (e.g., red for errors, green for success)
    const particleColor = data.colorTheme === 'rose' ? '#f43f5e'
        : data.colorTheme === 'emerald' ? '#10b981'
            : data.colorTheme === 'amber' ? '#f59e0b'
                : '#3b82f6'; // Default Electric Blue

    return (
        <>
            {/* 3. THE BASE PIPE (The translucent wire) */}
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    strokeWidth: 2,
                    stroke: '#334155', // slate-700
                    strokeOpacity: 0.6,
                }}
            />

            {/* 4. THE KINETIC PARTICLES */}
            {isKinetic && (
                <>
                    {/* Particle 1 */}
                    <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}>
                        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
                    </circle>

                    {/* Particle 2 (Starts 0.66 seconds later to space them out) */}
                    <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}>
                        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="0.66s" />
                    </circle>

                    {/* Particle 3 (Starts 1.33 seconds later) */}
                    <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}>
                        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="1.33s" />
                    </circle>
                </>
            )}

            {/* 5. THE FLOATING LABEL (For relational database joins or Yes/No conditions) */}
            {label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan bg-slate-900 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase"
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}