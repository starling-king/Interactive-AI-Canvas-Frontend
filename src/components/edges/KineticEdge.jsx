// import React from 'react';
// import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, MarkerType, useInternalNode } from '@xyflow/react';

// export default function KineticEdge({
//     id, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {},
//     markerEnd, label, animated, data = {}
// }) {
//     const [edgePath, labelX, labelY] = getSmoothStepPath({
//         sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
//     });

//     // 1. THE SMART SENSOR
//     const sourceNode = useInternalNode(source);
//     const isSourceActive = sourceNode?.data?.value === true || sourceNode?.data?.isActive === true;
//     const isKinetic = animated || data.animated === true || isSourceActive;
//     const sData = sourceNode?.data || {};

//     // 2. THEME INHERITANCE
//     // If the data tells us this is an "error" flow, it flows red. Otherwise, electric blue.
//     const particleColor = data.colorTheme === 'rose' ? '#f43f5e' : data.colorTheme === 'emerald' ? '#10b981' : data.colorTheme === 'amber' ? '#f59e0b' : '#3b82f6';

//     const safeMarkerEnd = markerEnd || {
//         type: MarkerType.ArrowClosed,
//         width: 20, height: 20, color: '#334155'
//     };

//     return (
//         <>
//             <BaseEdge id={id} path={edgePath} markerEnd={safeMarkerEnd} style={{ ...style, strokeWidth: 2, stroke: '#334155', strokeOpacity: 0.6 }} />

//             {/* ONLY render the expensive SVG animations if the flow is actively triggered */}
//             {isKinetic && (
//                 <>
//                     <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}><animateMotion dur="2s" repeatCount="indefinite" path={edgePath} /></circle>
//                     <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}><animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="0.66s" /></circle>
//                     <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}><animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="1.33s" /></circle>
//                 </>
//             )}

//             {label && (
//                 <EdgeLabelRenderer>
//                     <div style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, pointerEvents: 'all' }} className="nodrag nopan bg-slate-900 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase">
//                         {label}
//                     </div>
//                 </EdgeLabelRenderer>
//             )}
//         </>
//     );
// }

import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, MarkerType, useInternalNode } from '@xyflow/react';

export default function KineticEdge({
    id, source, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {},
    markerEnd, label, animated, data = {}
}) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 20, offset: 30
    });

    // 1. THE SMART SENSOR
    const sourceNode = useInternalNode(source);
    const sData = sourceNode?.data || {};

    // ============================================================================
    // THE FIX: Deep Payload Inspection (Lateral Sensor)
    // WHERE: Replaced `const isSourceActive = sourceNode?.data?.value === true...`
    // WHY: InteractiveNode outputs dynamic keys (e.g., outputValues.out = { velocity: 50 })
    // instead of a top-level boolean. This upgrade inspects toggles, sliders (>0), and 
    // dynamically named math/gate outputs. It creates massive architectural leverage: 
    // any node can pass a positive number or 'true', and the wire will inherently know to animate.
    // ============================================================================
    const isSourceActive =
        sData.isActive === true ||
        sData.defaultState === true ||
        (typeof sData.value === 'number' && sData.value > 0) ||
        (sData.outputValues?.out && Object.values(sData.outputValues.out).some(val =>
            val === true || (typeof val === 'number' && val > 0)
        ));

    const isKinetic = animated || data.animated === true || isSourceActive;

    // 2. THEME INHERITANCE
    // If the data tells us this is an "error" flow, it flows red. Otherwise, electric blue.
    const particleColor = data.colorTheme === 'rose' ? '#f43f5e' : data.colorTheme === 'emerald' ? '#10b981' : data.colorTheme === 'amber' ? '#f59e0b' : '#3b82f6';

    const safeMarkerEnd = markerEnd || {
        type: MarkerType.ArrowClosed,
        width: 20, height: 20, color: '#334155'
    };

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={safeMarkerEnd} style={{ ...style, strokeWidth: 2, stroke: '#334155', strokeOpacity: 0.6 }} />

            {/* ONLY render the expensive SVG animations if the flow is actively triggered */}
            {isKinetic && (
                <>
                    <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}><animateMotion dur="2s" repeatCount="indefinite" path={edgePath} /></circle>
                    <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}><animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="0.66s" /></circle>
                    <circle r="4" fill={particleColor} style={{ filter: `drop-shadow(0 0 6px ${particleColor})` }}><animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="1.33s" /></circle>
                </>
            )}

            {label && (
                <EdgeLabelRenderer>
                    <div style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`, pointerEvents: 'all' }} className="nodrag nopan bg-slate-900 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700 shadow-xl tracking-wider uppercase">
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}