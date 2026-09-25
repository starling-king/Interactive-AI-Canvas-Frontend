import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCanvasStore } from '../../store/canvasStore.js';
import GlassCard from '../ui/GlassCard.jsx';
import GlassInput from '../ui/GlassInput.jsx';
import ElectricButton from '../ui/ElectricButton.jsx';

export default function NodeInspector({ selectedNode, onClose }) {
    const { nodes, onNodesChange } = useCanvasStore();
    const [localData, setLocalData] = useState(null);

    useEffect(() => {
        if (selectedNode) setLocalData(selectedNode.data);
        else setLocalData(null);
    }, [selectedNode]);

    const handleChange = (field, value) => {
        setLocalData(prev => ({ ...prev, [field]: value }));
    };

    const handleFormulaChange = (index, value) => {
        const newFormulas = [...(localData.formulas || [])];
        newFormulas[index] = value;
        handleChange('formulas', newFormulas);
    };

    const handleSave = () => {
        if (!selectedNode || !localData) return;
        const change = {
            id: selectedNode.id,
            type: 'replace',
            item: { ...selectedNode, data: localData }
        };
        onNodesChange([change]);
    };

    return (
        <AnimatePresence>
            {selectedNode && localData && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-24 right-4 bottom-24 z-40 w-80 pointer-events-none"
                >
                    <GlassCard padding="md" className="h-full flex flex-col pointer-events-auto shadow-2xl border-moon-800 bg-moon-900/95 overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-moon-800 mb-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-electric uppercase tracking-widest">
                                    {selectedNode.type.replace('node_', '')}
                                </span>
                                <h3 className="text-sm font-semibold text-slate-100 font-mono truncate w-48">
                                    ID: {selectedNode.id}
                                </h3>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-5 no-scrollbar pr-2">
                            {(selectedNode.type === 'node_shape' || selectedNode.type === 'node_interactive') && (
                                <GlassInput
                                    label="Label"
                                    value={localData.label || ''}
                                    onChange={(e) => handleChange('label', e.target.value)}
                                    placeholder="Node Name"
                                />
                            )}

                            {localData.controlType === 'slider' && (
                                <div className="space-y-3">
                                    {/* THE FIX: Manual Variable Override Input */}
                                    <GlassInput
                                        label="Variable Name (metricKey)"
                                        value={localData.metricKey || ''}
                                        onChange={(e) => handleChange('metricKey', e.target.value)}
                                        placeholder="e.g., bioActivity"
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <GlassInput
                                            label="Min Value"
                                            type="number"
                                            value={localData.min ?? 0}
                                            onChange={(e) => handleChange('min', Number(e.target.value))}
                                        />
                                        <GlassInput
                                            label="Max Value"
                                            type="number"
                                            value={localData.max ?? 100}
                                            onChange={(e) => handleChange('max', Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            )}

                            {localData.controlType === 'gate' && (
                                <GlassInput
                                    label="Condition (e.g. x > 10)"
                                    value={localData.condition || ''}
                                    onChange={(e) => handleChange('condition', e.target.value)}
                                    placeholder="Evaluation string"
                                />
                            )}

                            {localData.controlType === 'math' && Array.isArray(localData.formulas) && (
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold tracking-wider uppercase text-slate-400">
                                        Formulas
                                    </label>
                                    {localData.formulas.map((formula, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            value={formula}
                                            onChange={(e) => handleFormulaChange(idx, e.target.value)}
                                            className="w-full px-3 py-2 text-xs font-mono bg-moon-950 border border-moon-800 rounded-lg text-slate-200 focus:outline-none focus:border-electric"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 mt-auto border-t border-moon-800">
                            <ElectricButton variant="primary" size="sm" onClick={handleSave} className="w-full">
                                Update Node
                            </ElectricButton>
                        </div>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// import { useState, useEffect, useRef } from 'react';
// import { Handle, Position } from '@xyflow/react';
// import NodeWrapper from './NodeWrapper';
// import { MathEngine } from '../../utils/mathEngine.js';
// import { useCanvasStore } from '../../store/canvasStore.js';

// // Import the Dumb Dials
// import SliderControl from '../controls/SliderControl.jsx';
// import ToggleControl from '../controls/ToggleControl.jsx';
// import MathControl from '../controls/MathControl.jsx';
// import GateControl from '../controls/GateControl.jsx';

// export default function InteractiveNode({ id, data, selected, isConnectable }) {
//     const { globalMetrics, updateGlobalMetrics } = useCanvasStore();
//     const controlType = data.controlType || 'metric';

//     const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
//     const [toggleState, setToggleState] = useState(data.defaultState ?? true);
//     const [mathResults, setMathResults] = useState({});
//     const [gatePassed, setGatePassed] = useState(false);

//     const loopBreaker = useRef(0);

//     // 1. Math Evaluation Logic (Motherboard Brain)
//     useEffect(() => {
//         // AI now sends a singular 'formula' string. We include 'formulas[0]' as a fallback just in case.
//         const formulaStr = data.formula || (Array.isArray(data.formulas) ? data.formulas[0] : null);

//         if (controlType === 'math' && formulaStr) {
//             if (loopBreaker.current > 5) {
//                 console.warn(`[Circuit Breaker] Node ${id} halted to prevent infinite loop.`);
//                 return;
//             }

//             const scope = { ...globalMetrics };
//             const computedResults = MathEngine.processFormula(formulaStr, scope);

//             setMathResults(computedResults);

//             let hasChanges = false;
//             for (const key in computedResults) {
//                 const newVal = typeof computedResults[key] === 'object' && computedResults[key] !== null
//                     ? JSON.stringify(computedResults[key]) : computedResults[key];
//                 const oldVal = typeof globalMetrics[key] === 'object' && globalMetrics[key] !== null
//                     ? JSON.stringify(globalMetrics[key]) : globalMetrics[key];

//                 if (newVal !== oldVal) {
//                     hasChanges = true;
//                     break;
//                 }
//             }

//             if (hasChanges) {
//                 loopBreaker.current += 1;
//                 updateGlobalMetrics({ ...globalMetrics, ...computedResults });
//                 setTimeout(() => { loopBreaker.current = 0; }, 1000);
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [globalMetrics, controlType, data.formula, data.formulas]);

//     // 2. Decision Gate Logic
//     useEffect(() => {
//         if (controlType === 'gate' && data.condition) {
//             const passed = MathEngine.evaluateCondition(data.condition, globalMetrics);
//             setGatePassed(passed);
//         }
//     }, [globalMetrics, controlType, data.condition]);

//     const handleSliderChange = (e) => {
//         const val = Number(e.target.value);
//         setSliderVal(val);
//         updateGlobalMetrics({ ...globalMetrics, [data.metricKey || id]: val });
//     };

//     const handleToggle = () => {
//         const next = !toggleState;
//         setToggleState(next);
//         updateGlobalMetrics({ ...globalMetrics, [data.metricKey || id]: next });
//     };

//     return (
//         <NodeWrapper id={id} data={data} selected={selected} minWidth={180} minHeight={90}>
//             <div className={`relative w-full h-full p-3 rounded-xl bg-slate-900 border text-slate-100 transition-shadow ${selected ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-700 shadow-xl'
//                 }`}>
//                 {/* Omni-directional ghost borders for drawing arrows from any edge */}

//                 <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />
//                 <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />

//                 <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />
//                 <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />

//                 <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="left" />
//                 <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="left" />

//                 <Handle type="target" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="right" />
//                 <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="right" />

//                 {/* Header */}
//                 <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 pointer-events-none">
//                     <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
//                         {controlType}
//                     </span>
//                     <span className="text-[10px] font-mono text-blue-400 truncate max-w-[100px]" title={data.label || id}>
//                         {data.label || id}
//                     </span>
//                 </div>

//                 {/* Routing the data to the Dumb Dials */}
//                 {controlType === 'slider' && <SliderControl data={data} value={sliderVal} onChange={handleSliderChange} />}
//                 {controlType === 'toggle' && <ToggleControl state={toggleState} onToggle={handleToggle} />}
//                 {controlType === 'math' && <MathControl results={mathResults} />}
//                 {controlType === 'gate' && <GateControl condition={data.condition} passed={gatePassed} />}
//             </div>
//         </NodeWrapper>
//     );
// }