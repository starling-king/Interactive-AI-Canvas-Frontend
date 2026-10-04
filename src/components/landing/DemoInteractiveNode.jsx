// import React, { useState, useEffect, useRef } from 'react';
// import { Handle, Position } from '@xyflow/react';
// import NodeWrapper from '../nodes/NodeWrapper.jsx';
// import { SliderControl, GateControl } from '../controls/index.js';
// import { useDemoActions } from '../../hooks/useDemoActions.js';

// export default function DemoInteractiveNode({ id, data, selected, isConnectable }) {
//     const { processDemoCascade } = useDemoActions();
//     const controlType = data.controlType || 'slider';

//     // Local execution state
//     const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
//     const updateTimeoutRef = useRef(null);

//     // Debounced Dispatch Engine
//     useEffect(() => {
//         if (controlType === 'slider') {
//             if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

//             updateTimeoutRef.current = setTimeout(() => {
//                 processDemoCascade(data.metricKey, sliderVal);
//             }, 300); // 300ms human input stabilizer
//         }
//         return () => {
//             if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
//         };
//     }, [sliderVal, controlType, data.metricKey]);

//     const handleSliderChange = (e) => setSliderVal(parseFloat(e.target.value));

//     return (
//         <NodeWrapper id={id} data={data} selected={selected} minWidth={260} minHeight={130} defaultAnimation="none">
//             <div className={`relative w-full h-full flex flex-col rounded-2xl border transition-all duration-300 ease-out backdrop-blur-xl bg-[#1E1F24]/85 ${selected ? 'border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]' : 'border-[#0A192F] shadow-2xl'}`}>

//                 {/* Ports */}
//                 <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
//                     <Handle type="target" position={Position.Left} id="left-target" isConnectable={isConnectable} className="w-3.5 h-3.5 bg-[#0A192F] border-2 border-[#1E1F24] rounded-full !relative !transform-none shadow-md" />
//                 </div>
//                 <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20">
//                     <Handle type="source" position={Position.Right} id="right-source" isConnectable={isConnectable} className={`w-3.5 h-3.5 border-2 rounded-full !relative !transform-none shadow-md ${controlType === 'gate' && data.passed ? 'bg-[#00E5FF]/20 border-[#00E5FF]' : 'bg-[#0A192F] border-[#1E1F24]'}`} />
//                 </div>

//                 {/* Header */}
//                 <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#0A192F]/80 to-transparent rounded-t-2xl pointer-events-auto border-b border-[#0A192F]">
//                     <div className="flex items-center gap-3 pointer-events-none">
//                         <div className="w-8 h-8 flex items-center justify-center rounded-xl border bg-[#00E5FF]/5 border-[#00E5FF]/20 text-[#00E5FF] shrink-0 shadow-inner">
//                             <span className="text-sm font-black">{controlType === 'slider' ? "⎚" : "◇"}</span>
//                         </div>
//                         <div className="flex flex-col min-w-0">
//                             <span className="text-[9px] font-bold uppercase tracking-widest text-[#00E5FF]/70">{controlType}</span>
//                             <span className="text-xs font-semibold text-gray-100 truncate pr-2 font-sans tracking-wide">{data.label}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Controls Zone */}
//                 <div className="flex-1 p-4 nodrag nopan flex flex-col justify-center transition-opacity duration-300 relative z-10 pointer-events-auto">
//                     {controlType === 'slider' && <SliderControl data={data} value={sliderVal} onChange={handleSliderChange} />}
//                     {controlType === 'gate' && <GateControl condition={data.condition} passed={data.passed} />}
//                 </div>
//             </div>
//         </NodeWrapper>
//     );
// }


import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeWrapper from '../nodes/NodeWrapper.jsx';
import { SliderControl, ToggleControl, GateControl } from '../controls/index.js';
import { useDemoActions } from '../../hooks/useDemoActions.js'; // Adjust path as needed

export default function DemoInteractiveNode({ id, data, selected, isConnectable }) {
    const controlType = data.controlType || 'slider';
    const nodeVarName = data.label || data.metricKey || 'out';

    // 1. ISOLATED LOCAL STATE (Handles only the 60fps UI drag)
    const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
    const { processDemoCascade } = useDemoActions();
    const updateTimeoutRef = useRef(null);

    // 2. CENTRAL BRAIN DISPATCH (Debounced)
    // Only the slider triggers updates. Gates and Toggles are "read-only" targets in this demo.
    useEffect(() => {
        if (controlType === 'slider') {
            if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

            updateTimeoutRef.current = setTimeout(() => {
                processDemoCascade(data.metricKey, sliderVal);
            }, 300);
        }
        return () => {
            if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
        };
    }, [sliderVal, controlType, data.metricKey, processDemoCascade]);

    const handleSliderChange = (e) => setSliderVal(parseFloat(e.target.value));

    // 3. UI DISPLAY LOGIC
    const hasInput1 = ['slider', 'gate', 'toggle'].includes(controlType);
    const hasInput2 = ['slider', 'gate'].includes(controlType);

    let outDisplay = 'out';
    if (controlType === 'slider') outDisplay = Number(sliderVal).toFixed(2);
    else if (controlType === 'gate') outDisplay = data.passed ? 'TRUE' : 'FALSE';
    else if (controlType === 'toggle') outDisplay = data.defaultState ? 'TRUE' : 'FALSE';

    const getAnimClass = () => {
        switch (data.animationStyle) {
            case 'float': return 'node-anim-float';
            case 'glow': return 'node-anim-glow';
            case 'breathe': return 'node-anim-breathe';
            default: return '';
        }
    };

    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={260} minHeight={130} defaultAnimation="none">
            <style>{`
                @keyframes smoothFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes electricGlow { 0%, 100% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.05); } 50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.4); } }
                .node-anim-float { animation: smoothFloat 4s ease-in-out infinite; }
                .node-anim-glow { animation: electricGlow 3s ease-in-out infinite; }
                .node-anim-breathe { animation: smoothFloat 5s ease-in-out infinite, electricGlow 4s ease-in-out infinite; }
            `}</style>

            <div className={`relative w-full h-full flex flex-col rounded-2xl border transition-all duration-300 ease-out backdrop-blur-xl bg-[#1E1F24]/85 ${getAnimClass()} ${selected ? 'border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]' : 'border-[#0A192F] shadow-2xl'}`}>

                {/* PORTS */}
                {hasInput1 && (
                    <div className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 group/port1 z-20 ${hasInput2 ? 'top-1/3' : 'top-1/2'}`}>
                        <Handle type="target" position={Position.Left} id="left-target" isConnectable={isConnectable} className="w-3.5 h-3.5 bg-[#0A192F] border-2 border-[#1E1F24] rounded-full hover:border-[#00E5FF] hover:scale-110 transition-all !relative !transform-none shadow-md" />
                    </div>
                )}

                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 group/out z-20">
                    <Handle type="source" position={Position.Right} id="right-source" isConnectable={isConnectable} className={`w-3.5 h-3.5 border-2 rounded-full hover:scale-110 transition-all duration-300 !relative !transform-none shadow-md ${(controlType === 'gate' && data.passed) || (controlType === 'toggle' && data.defaultState) ? 'bg-[#00E5FF]/20 border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.5)]' : 'bg-[#0A192F] border-[#1E1F24] hover:border-[#00E5FF]'}`} />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-300 bg-[#0A192F]/95 px-2 py-0.5 rounded-md pointer-events-none opacity-0 group-hover/out:opacity-100 border border-[#00E5FF]/40 backdrop-blur-md transition-opacity whitespace-nowrap z-50">
                        {nodeVarName}: {outDisplay}
                    </span>
                </div>

                {/* HEADER */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#0A192F]/80 to-transparent rounded-t-2xl pointer-events-auto border-b border-[#0A192F]">
                    <div className="flex items-center gap-3 pointer-events-none">
                        <div className="w-8 h-8 flex items-center justify-center rounded-xl border bg-[#00E5FF]/5 border-[#00E5FF]/20 text-[#00E5FF] shrink-0 shadow-inner">
                            <span className="text-sm font-black">{controlType === 'slider' ? "⎚" : controlType === 'gate' ? "◇" : "⏻"}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#00E5FF]/70">{controlType}</span>
                            <span className="text-xs font-semibold text-gray-100 truncate pr-2 font-sans tracking-wide">{data.label}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 z-30">
                        {/* Stripped out the global toggle and animation selects to strictly lock the demo UI */}
                        <span className="bg-[#00E5FF]/10 text-[#00E5FF] text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded border border-[#00E5FF]/30">
                            LOCKED DEMO
                        </span>
                    </div>
                </div>

                {/* CONTROLS ZONE */}
                <div className="flex-1 p-4 nodrag nopan flex flex-col justify-center transition-opacity duration-300 relative z-10 pointer-events-auto">
                    {controlType === 'slider' && <SliderControl data={data} value={sliderVal} onChange={handleSliderChange} />}
                    {controlType === 'toggle' && <ToggleControl state={data.defaultState} onToggle={() => { }} />}
                    {controlType === 'gate' && <GateControl condition={data.condition} passed={data.passed} />}
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none mix-blend-overlay z-0" />
            </div>
        </NodeWrapper>
    );
}