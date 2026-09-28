// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCanvasStore } from '../../store/canvasStore.js';
// import GlassCard from '../ui/GlassCard.jsx';
// import GlassInput from '../ui/GlassInput.jsx';
// import ElectricButton from '../ui/ElectricButton.jsx';

// export default function NodeInspector({ selectedNode, onClose }) {
//     const { nodes, onNodesChange } = useCanvasStore();
//     const [localData, setLocalData] = useState(null);

//     useEffect(() => {
//         if (selectedNode) setLocalData(selectedNode.data);
//         else setLocalData(null);
//     }, [selectedNode]);

//     const handleChange = (field, value) => {
//         setLocalData(prev => ({ ...prev, [field]: value }));
//     };

//     const handleFormulaChange = (index, value) => {
//         const newFormulas = [...(localData.formulas || [])];
//         newFormulas[index] = value;
//         handleChange('formulas', newFormulas);
//     };

//     const handleSave = () => {
//         if (!selectedNode || !localData) return;
//         const change = {
//             id: selectedNode.id,
//             type: 'replace',
//             item: { ...selectedNode, data: localData }
//         };
//         onNodesChange([change]);
//     };

//     return (
//         <AnimatePresence>
//             {selectedNode && localData && (
//                 <motion.div
//                     initial={{ x: '100%' }}
//                     animate={{ x: 0 }}
//                     exit={{ x: '100%' }}
//                     transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//                     className="fixed top-24 right-4 bottom-24 z-40 w-80 pointer-events-none"
//                 >
//                     <GlassCard padding="md" className="h-full flex flex-col pointer-events-auto shadow-2xl border-moon-800 bg-moon-900/95 overflow-hidden">
//                         <div className="flex items-center justify-between pb-4 border-b border-moon-800 mb-4">
//                             <div className="flex flex-col">
//                                 <span className="text-[10px] font-bold text-electric uppercase tracking-widest">
//                                     {selectedNode.type.replace('node_', '')}
//                                 </span>
//                                 <h3 className="text-sm font-semibold text-slate-100 font-mono truncate w-48">
//                                     ID: {selectedNode.id}
//                                 </h3>
//                             </div>
//                             <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         <div className="flex-1 overflow-y-auto space-y-5 no-scrollbar pr-2">
//                             {(selectedNode.type === 'node_shape' || selectedNode.type === 'node_interactive') && (
//                                 <GlassInput
//                                     label="Label"
//                                     value={localData.label || ''}
//                                     onChange={(e) => handleChange('label', e.target.value)}
//                                     placeholder="Node Name"
//                                 />
//                             )}

//                             {localData.controlType === 'slider' && (
//                                 <div className="space-y-3">
//                                     {/* THE FIX: Manual Variable Override Input */}
//                                     <GlassInput
//                                         label="Variable Name (metricKey)"
//                                         value={localData.metricKey || ''}
//                                         onChange={(e) => handleChange('metricKey', e.target.value)}
//                                         placeholder="e.g., bioActivity"
//                                     />
//                                     <div className="grid grid-cols-2 gap-3">
//                                         <GlassInput
//                                             label="Min Value"
//                                             type="number"
//                                             value={localData.min ?? 0}
//                                             onChange={(e) => handleChange('min', Number(e.target.value))}
//                                         />
//                                         <GlassInput
//                                             label="Max Value"
//                                             type="number"
//                                             value={localData.max ?? 100}
//                                             onChange={(e) => handleChange('max', Number(e.target.value))}
//                                         />
//                                     </div>
//                                 </div>
//                             )}

//                             {localData.controlType === 'gate' && (
//                                 <GlassInput
//                                     label="Condition (e.g. x > 10)"
//                                     value={localData.condition || ''}
//                                     onChange={(e) => handleChange('condition', e.target.value)}
//                                     placeholder="Evaluation string"
//                                 />
//                             )}

//                             {localData.controlType === 'math' && Array.isArray(localData.formulas) && (
//                                 <div className="space-y-2">
//                                     <label className="block text-xs font-bold tracking-wider uppercase text-slate-400">
//                                         Formulas
//                                     </label>
//                                     {localData.formulas.map((formula, idx) => (
//                                         <input
//                                             key={idx}
//                                             type="text"
//                                             value={formula}
//                                             onChange={(e) => handleFormulaChange(idx, e.target.value)}
//                                             className="w-full px-3 py-2 text-xs font-mono bg-moon-950 border border-moon-800 rounded-lg text-slate-200 focus:outline-none focus:border-electric"
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="pt-4 mt-auto border-t border-moon-800">
//                             <ElectricButton variant="primary" size="sm" onClick={handleSave} className="w-full">
//                                 Update Node
//                             </ElectricButton>
//                         </div>
//                     </GlassCard>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeWrapper from './NodeWrapper.jsx';
import { MathEngine } from '../../utils/mathEngine.js';
import { useCanvasStore } from '../../store/canvasStore.js';

// Import the UI dials
import { SliderControl, ToggleControl, MathControl, GateControl } from '../controls/index.js';

export default function InteractiveNode({ id, data, selected, isConnectable }) {
    // 1. CONNECT TO THE GLOBAL BRAIN
    const { globalMetrics, updateGlobalMetrics } = useCanvasStore();
    const controlType = data.controlType || 'slider';

    // 2. LOCAL UI STATE
    const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
    const [toggleState, setToggleState] = useState(data.defaultState ?? true);
    const [mathResults, setMathResults] = useState({});
    const [gatePassed, setGatePassed] = useState(false);

    // Circuit breaker to prevent React from crashing if formulas loop infinitely
    const loopBreaker = useRef(0);

    // 3. THE MOTHERBOARD: Math Evaluation
    useEffect(() => {
        // Safely extract the formula whether the AI passed a string or an array
        const formulaStr = data.formula || (Array.isArray(data.formulas) ? data.formulas[0] : null);

        if (controlType === 'math' && formulaStr) {
            if (loopBreaker.current > 10) return; // Prevent infinite re-render loops

            const scope = { ...globalMetrics };
            const computedResults = MathEngine.processFormula(formulaStr, scope);

            setMathResults(computedResults);

            // Detect if the new calculation actually changed the global state
            let hasChanges = false;
            for (const key in computedResults) {
                if (computedResults[key] !== globalMetrics[key]) {
                    hasChanges = true;
                    break;
                }
            }

            // Only update Zustand if necessary
            if (hasChanges) {
                loopBreaker.current += 1;
                updateGlobalMetrics({ ...globalMetrics, ...computedResults });
                // Reset the breaker after a brief cool-down
                setTimeout(() => { loopBreaker.current = 0; }, 500);
            }
        }
    }, [globalMetrics, controlType, data.formula, data.formulas, updateGlobalMetrics]);

    // 4. THE LOGIC GATE
    useEffect(() => {
        if (controlType === 'gate' && data.condition) {
            const passed = MathEngine.evaluateCondition(data.condition, globalMetrics);
            setGatePassed(passed);
        }
    }, [globalMetrics, controlType, data.condition]);

    // 5. MANUAL USER INPUT HANDLERS
    const handleSliderChange = (e) => {
        const val = Number(e.target.value);
        setSliderVal(val);
        // Instantly push the user's manual change into the global Zustand memory
        // This causes all connected Math and Gate nodes to instantly recalculate
        updateGlobalMetrics({ ...globalMetrics, [data.metricKey || id]: val });
    };

    const handleToggle = () => {
        const next = !toggleState;
        setToggleState(next);
        updateGlobalMetrics({ ...globalMetrics, [data.metricKey || id]: next });
    };

    // 6. VISUAL ENGINEERING: Dynamic themes based on the control type
    const typeConfig = {
        slider: { icon: "⎚", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
        gate: { icon: "◇", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
        math: { icon: "∑", color: "text-electric", bg: "bg-electric/10", border: "border-electric/30" },
        toggle: { icon: "⏻", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" }
    };
    const config = typeConfig[controlType] || typeConfig.slider;

    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={220} minHeight={100} defaultAnimation="none">
            <div className={`relative w-full h-full flex flex-col p-3 rounded-xl border transition-all duration-300 backdrop-blur-md bg-moon-900/90 ${selected ? 'border-electric shadow-[0_0_20px_var(--color-electric-glow)]' : 'border-moon-700 shadow-xl'
                }`}>

                {/* 8 Strict Overlapping Routing Handles */}
                {/* <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" /> */}

                {/* LAYER 3: The Interaction Layer (Handles & Text) */}
                {/* Target Handles (Entrances) */}
                <Handle type="target" position={Position.Top} id="top-target" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Bottom} id="bottom-target" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Left} id="left-target" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Right} id="right-target" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                {/* Source Handles (Exits) */}
                <Handle type="source" position={Position.Top} id="top-source" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom-source" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Left} id="left-source" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Right} id="right-source" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                {/* THE HEADER: Dynamic Icon & Color mapping */}
                <div className="flex items-center gap-2 border-b border-moon-800 pb-2 mb-3 pointer-events-none">
                    <div className={`w-7 h-7 flex items-center justify-center rounded-lg border ${config.bg} ${config.border} ${config.color} shrink-0`}>
                        <span className="text-sm font-black">{config.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                            {controlType}
                        </span>
                        <span className="text-xs font-semibold text-slate-200 truncate pr-2">
                            {data.label || 'Interactive Node'}
                        </span>
                    </div>
                </div>

                {/* 
                  THE FIX: 'nodrag' and 'nopan' are reserved React Flow keywords.
                  Wrapping the controls in this div creates a "safe zone" where the user
                  can freely slide inputs without dragging the entire node across the screen.
                */}
                <div className="flex-1 nodrag nopan pointer-events-auto flex flex-col justify-center">
                    {controlType === 'slider' && <SliderControl data={data} value={sliderVal} onChange={handleSliderChange} />}
                    {controlType === 'toggle' && <ToggleControl state={toggleState} onToggle={handleToggle} />}
                    {controlType === 'math' && <MathControl results={mathResults} />}
                    {controlType === 'gate' && <GateControl condition={data.condition} passed={gatePassed} />}
                </div>

            </div>
        </NodeWrapper>
    );
}