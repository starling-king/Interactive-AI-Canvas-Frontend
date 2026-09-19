// // // import { useState, useEffect } from 'react';
// // // import { Handle, Position } from '@xyflow/react';
// // // import { motion } from 'framer-motion';
// // // import { MathEngine } from '../../utils/mathEngine.js'; // Using your dedicated brain
// // // import { useCanvasStore } from '../../store/canvasStore.js';

// // // export default function InteractiveNode({ id, data, selected, isConnectable }) {
// // //     const { globalMetrics, updateGlobalMetrics } = useCanvasStore();
// // //     const controlType = data.controlType || 'metric';

// // //     // Local state for immediate UI feedback
// // //     const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
// // //     const [toggleState, setToggleState] = useState(data.defaultState ?? true);
// // //     const [mathResults, setMathResults] = useState({});
// // //     const [gatePassed, setGatePassed] = useState(false);

// // //     // 1. Math Evaluation Logic (Now outsourced to MathEngine)
// // //     useEffect(() => {
// // //         if (controlType === 'math' && Array.isArray(data.formulas)) {
// // //             // Create a clone of the global metrics to avoid mutating state directly
// // //             const scope = { ...globalMetrics };
            
// // //             // MathEngine processes the formulas and returns the newly computed variables
// // //             const computedResults = MathEngine.processFormulas(data.formulas, scope);
            
// // //             setMathResults(computedResults);
            
// // //             // Only push updates to global store if we actually computed something
// // //             if (Object.keys(computedResults).length > 0) {
// // //                 updateGlobalMetrics(computedResults);
// // //             }
// // //         }
// // //     }, [globalMetrics, controlType, data.formulas, updateGlobalMetrics]);

// // //     // 2. Decision Gate Logic (Outsourced to MathEngine)
// // //     useEffect(() => {
// // //         if (controlType === 'gate' && data.condition) {
// // //             const passed = MathEngine.evaluateCondition(data.condition, globalMetrics);
// // //             setGatePassed(passed);
// // //         }
// // //     }, [globalMetrics, controlType, data.condition]);

// // //     // Slider change handler
// // //     const handleSliderChange = (e) => {
// // //         const val = Number(e.target.value);
// // //         setSliderVal(val);
// // //         const metricKey = data.metricKey || id;
// // //         updateGlobalMetrics({ [metricKey]: val });
// // //     };

// // //     // Toggle switch handler
// // //     const handleToggle = () => {
// // //         const next = !toggleState;
// // //         setToggleState(next);
// // //         const metricKey = data.metricKey || id;
// // //         updateGlobalMetrics({ [metricKey]: next });
// // //     };

// // //     return (
// // //         <motion.div
// // //             initial={{ opacity: 0, scale: 0.85 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className={`min-w-[180px] p-3 rounded-xl bg-slate-900 border text-slate-100 shadow-xl transition-all ${
// // //                 selected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700'
// // //             }`}
// // //         >
// // //             {/* Standard React Flow Handles */}
// // //             <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />
// // //             <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />

// // //             {/* Header / Type Label */}
// // //             <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
// // //                 <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
// // //                     {controlType}
// // //                 </span>
// // //                 <span className="text-[10px] font-mono text-blue-400">
// // //                     {data.label || id}
// // //                 </span>
// // //             </div>

// // //             {/* Dynamic UI Content */}
// // //             {controlType === 'slider' && (
// // //                 <div className="space-y-1.5">
// // //                     <div className="flex justify-between text-xs font-mono">
// // //                         <span className="text-slate-400">Value:</span>
// // //                         <span className="text-emerald-400 font-semibold">{sliderVal}</span>
// // //                     </div>
// // //                     <input
// // //                         type="range"
// // //                         min={data.min ?? 0}
// // //                         max={data.max ?? 100}
// // //                         value={sliderVal}
// // //                         onChange={handleSliderChange}
// // //                         className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
// // //                     />
// // //                 </div>
// // //             )}

// // //             {controlType === 'toggle' && (
// // //                 <div className="flex items-center justify-between py-1">
// // //                     <span className="text-xs text-slate-300 font-mono">State</span>
// // //                     <button
// // //                         type="button"
// // //                         onClick={handleToggle}
// // //                         className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
// // //                             toggleState ? 'bg-emerald-600' : 'bg-slate-700'
// // //                         }`}
// // //                     >
// // //                         <motion.div
// // //                             layout
// // //                             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
// // //                             className={`bg-white w-4 h-4 rounded-full shadow-md ${
// // //                                 toggleState ? 'ml-auto' : ''
// // //                             }`}
// // //                         />
// // //                     </button>
// // //                 </div>
// // //             )}

// // //             {controlType === 'math' && (
// // //                 <div className="space-y-1 font-mono text-xs">
// // //                     {Object.keys(mathResults).length > 0 ? (
// // //                         Object.entries(mathResults).map(([key, val]) => (
// // //                             <div key={key} className="flex justify-between bg-slate-800/60 px-2 py-1 rounded">
// // //                                 <span className="text-slate-300">{key}:</span>
// // //                                 <span className="text-blue-400 font-semibold">
// // //                                     {/* Format to 2 decimal places to keep the UI clean */}
// // //                                     {typeof val === 'number' ? val.toFixed(2) : val}
// // //                                 </span>
// // //                             </div>
// // //                         ))
// // //                     ) : (
// // //                         <div className="text-[11px] text-slate-500 italic">No output...</div>
// // //                     )}
// // //                 </div>
// // //             )}

// // //             {controlType === 'gate' && (
// // //                 <div className="space-y-1.5 font-mono text-xs text-center">
// // //                     <div className="text-[10px] text-slate-400">{data.condition}</div>
// // //                     <div
// // //                         className={`py-1 rounded font-bold uppercase tracking-wider text-[11px] ${
// // //                             gatePassed
// // //                                 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
// // //                                 : 'bg-rose-950/80 text-rose-400 border border-rose-600/50'
// // //                         }`}
// // //                     >
// // //                         {gatePassed ? 'Pass' : 'Reject'}
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </motion.div>
// // //     );
// // // }


// // import { useState, useEffect } from 'react';
// // import { Handle, Position } from '@xyflow/react';
// // import { motion } from 'framer-motion';
// // import { MathEngine } from '../../utils/mathEngine.js';
// // import { useCanvasStore } from '../../store/canvasStore.js';

// // export default function InteractiveNode({ id, data, selected, isConnectable }) {
// //     const { globalMetrics, updateGlobalMetrics } = useCanvasStore();
// //     const controlType = data.controlType || 'metric';

// //     // Local state for immediate UI feedback
// //     const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
// //     const [toggleState, setToggleState] = useState(data.defaultState ?? true);
// //     const [mathResults, setMathResults] = useState({});
// //     const [gatePassed, setGatePassed] = useState(false);

// //     // 1. Math Evaluation Logic
// //     useEffect(() => {
// //         if (controlType === 'math' && Array.isArray(data.formulas)) {
// //             const scope = { ...globalMetrics };
// //             const computedResults = MathEngine.processFormulas(data.formulas, scope);

// //             setMathResults(computedResults);

// //             if (Object.keys(computedResults).length > 0) {
// //                 updateGlobalMetrics(computedResults);
// //             }
// //         }
// //     }, [globalMetrics, controlType, data.formulas, updateGlobalMetrics]);

// //     // 2. Decision Gate Logic
// //     useEffect(() => {
// //         if (controlType === 'gate' && data.condition) {
// //             const passed = MathEngine.evaluateCondition(data.condition, globalMetrics);
// //             setGatePassed(passed);
// //         }
// //     }, [globalMetrics, controlType, data.condition]);

// //     const handleSliderChange = (e) => {
// //         const val = Number(e.target.value);
// //         setSliderVal(val);
// //         const metricKey = data.metricKey || id;
// //         updateGlobalMetrics({ [metricKey]: val });
// //     };

// //     const handleToggle = () => {
// //         const next = !toggleState;
// //         setToggleState(next);
// //         const metricKey = data.metricKey || id;
// //         updateGlobalMetrics({ [metricKey]: next });
// //     };

// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, scale: 0.85 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className={`min-w-[180px] p-3 rounded-xl bg-slate-900 border text-slate-100 shadow-xl transition-all ${selected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700'
// //                 }`}
// //         >
// //             {/* Standard React Flow Handles */}
// //             <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />
// //             <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />

// //             {/* Header / Type Label */}
// //             <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
// //                 <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
// //                     {controlType}
// //                 </span>
// //                 <span className="text-[10px] font-mono text-blue-400">
// //                     {data.label || id}
// //                 </span>
// //             </div>

// //             {/* Dynamic UI Content */}
// //             {controlType === 'slider' && (
// //                 <div className="space-y-1.5">
// //                     <div className="flex justify-between text-xs font-mono">
// //                         <span className="text-slate-400">Value:</span>
// //                         <span className="text-emerald-400 font-semibold">{sliderVal}</span>
// //                     </div>
// //                     <input
// //                         type="range"
// //                         min={data.min ?? 0}
// //                         max={data.max ?? 100}
// //                         value={sliderVal}
// //                         onChange={handleSliderChange}
// //                         className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
// //                     />
// //                 </div>
// //             )}

// //             {controlType === 'toggle' && (
// //                 <div className="flex items-center justify-between py-1">
// //                     <span className="text-xs text-slate-300 font-mono">State</span>
// //                     <button
// //                         type="button"
// //                         onClick={handleToggle}
// //                         className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleState ? 'bg-emerald-600' : 'bg-slate-700'
// //                             }`}
// //                     >
// //                         <motion.div
// //                             layout
// //                             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
// //                             className={`bg-white w-4 h-4 rounded-full shadow-md ${toggleState ? 'ml-auto' : ''
// //                                 }`}
// //                         />
// //                     </button>
// //                 </div>
// //             )}

// //             {controlType === 'math' && (
// //                 <div className="space-y-1 font-mono text-xs">
// //                     {Object.keys(mathResults).length > 0 ? (
// //                         Object.entries(mathResults).map(([key, val]) => {
// //                             // FIX: Safely parse complex objects and arrays so React never crashes
// //                             let displayValue = val;
// //                             if (typeof val === 'number') {
// //                                 displayValue = val.toFixed(2);
// //                             } else if (typeof val === 'object' && val !== null) {
// //                                 displayValue = JSON.stringify(val);
// //                             } else {
// //                                 displayValue = String(val);
// //                             }

// //                             return (
// //                                 <div key={key} className="flex justify-between items-center bg-slate-800/60 px-2 py-1.5 rounded mt-1 overflow-hidden">
// //                                     <span className="text-slate-300 shrink-0 mr-2">{key}:</span>
// //                                     <span className="text-blue-400 font-semibold truncate" title={displayValue}>
// //                                         {displayValue}
// //                                     </span>
// //                                 </div>
// //                             );
// //                         })
// //                     ) : (
// //                         <div className="text-[11px] text-slate-500 italic">No output...</div>
// //                     )}
// //                 </div>
// //             )}

// //             {controlType === 'gate' && (
// //                 <div className="space-y-1.5 font-mono text-xs text-center">
// //                     <div className="text-[10px] text-slate-400 truncate" title={data.condition}>{data.condition}</div>
// //                     <div
// //                         className={`py-1 rounded font-bold uppercase tracking-wider text-[11px] ${gatePassed
// //                                 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
// //                                 : 'bg-rose-950/80 text-rose-400 border border-rose-600/50'
// //                             }`}
// //                     >
// //                         {gatePassed ? 'Pass' : 'Reject'}
// //                     </div>
// //                 </div>
// //             )}
// //         </motion.div>
// //     );
// // }

// import { useState, useEffect } from 'react';
// import { Handle, Position } from '@xyflow/react';
// import { motion } from 'framer-motion';
// import { MathEngine } from '../../utils/mathEngine.js';
// import { useCanvasStore } from '../../store/canvasStore.js';

// export default function InteractiveNode({ id, data, selected, isConnectable }) {
//     const { globalMetrics, updateGlobalMetrics } = useCanvasStore();
//     const controlType = data.controlType || 'metric';

//     const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
//     const [toggleState, setToggleState] = useState(data.defaultState ?? true);
//     const [mathResults, setMathResults] = useState({});
//     const [gatePassed, setGatePassed] = useState(false);

//     // 1. Math Evaluation Logic (Ping-Pong Fix)
//     useEffect(() => {
//         if (controlType === 'math' && Array.isArray(data.formulas)) {
//             const scope = { ...globalMetrics };
//             const computedResults = MathEngine.processFormulas(data.formulas, scope);

//             setMathResults(computedResults);

//             // THE FIX: Deep compare to see if the math actually changed
//             let hasChanges = false;
//             for (const key in computedResults) {
//                 // Safely handle arrays/objects from mathjs
//                 const newVal = typeof computedResults[key] === 'object' && computedResults[key] !== null
//                     ? JSON.stringify(computedResults[key])
//                     : computedResults[key];

//                 const oldVal = typeof globalMetrics[key] === 'object' && globalMetrics[key] !== null
//                     ? JSON.stringify(globalMetrics[key])
//                     : globalMetrics[key];

//                 if (newVal !== oldVal) {
//                     hasChanges = true;
//                     break;
//                 }
//             }

//             // THE FIX: Only update if changed, AND merge with the existing metrics
//             if (hasChanges) {
//                 updateGlobalMetrics({ ...globalMetrics, ...computedResults });
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [globalMetrics, controlType, data.formulas]);

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
//         const metricKey = data.metricKey || id;
//         updateGlobalMetrics({ ...globalMetrics, [metricKey]: val });
//     };

//     const handleToggle = () => {
//         const next = !toggleState;
//         setToggleState(next);
//         const metricKey = data.metricKey || id;
//         updateGlobalMetrics({ ...globalMetrics, [metricKey]: next });
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className={`min-w-[180px] p-3 rounded-xl bg-slate-900 border text-slate-100 shadow-xl transition-all ${selected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700'
//                 }`}
//         >
//             <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />
//             <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />

//             <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
//                 <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
//                     {controlType}
//                 </span>
//                 <span className="text-[10px] font-mono text-blue-400">
//                     {data.label || id}
//                 </span>
//             </div>

//             {controlType === 'slider' && (
//                 <div className="space-y-1.5">
//                     <div className="flex justify-between text-xs font-mono">
//                         <span className="text-slate-400">Value:</span>
//                         <span className="text-emerald-400 font-semibold">{sliderVal}</span>
//                     </div>
//                     <input
//                         type="range"
//                         min={data.min ?? 0}
//                         max={data.max ?? 100}
//                         value={sliderVal}
//                         onChange={handleSliderChange}
//                         className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
//                     />
//                 </div>
//             )}

//             {controlType === 'toggle' && (
//                 <div className="flex items-center justify-between py-1">
//                     <span className="text-xs text-slate-300 font-mono">State</span>
//                     <button
//                         type="button"
//                         onClick={handleToggle}
//                         className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleState ? 'bg-emerald-600' : 'bg-slate-700'
//                             }`}
//                     >
//                         <motion.div
//                             layout
//                             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                             className={`bg-white w-4 h-4 rounded-full shadow-md ${toggleState ? 'ml-auto' : ''
//                                 }`}
//                         />
//                     </button>
//                 </div>
//             )}

//             {controlType === 'math' && (
//                 <div className="space-y-1 font-mono text-xs">
//                     {Object.keys(mathResults).length > 0 ? (
//                         Object.entries(mathResults).map(([key, val]) => {
//                             let displayValue = val;
//                             if (typeof val === 'number') {
//                                 displayValue = val.toFixed(2);
//                             } else if (typeof val === 'object' && val !== null) {
//                                 displayValue = JSON.stringify(val);
//                             } else {
//                                 displayValue = String(val);
//                             }

//                             return (
//                                 <div key={key} className="flex justify-between items-center bg-slate-800/60 px-2 py-1.5 rounded mt-1 overflow-hidden">
//                                     <span className="text-slate-300 shrink-0 mr-2">{key}:</span>
//                                     <span className="text-blue-400 font-semibold truncate" title={displayValue}>
//                                         {displayValue}
//                                     </span>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <div className="text-[11px] text-slate-500 italic">No output...</div>
//                     )}
//                 </div>
//             )}

//             {controlType === 'gate' && (
//                 <div className="space-y-1.5 font-mono text-xs text-center">
//                     <div className="text-[10px] text-slate-400 truncate" title={data.condition}>{data.condition}</div>
//                     <div
//                         className={`py-1 rounded font-bold uppercase tracking-wider text-[11px] ${gatePassed
//                                 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
//                                 : 'bg-rose-950/80 text-rose-400 border border-rose-600/50'
//                             }`}
//                     >
//                         {gatePassed ? 'Pass' : 'Reject'}
//                     </div>
//                 </div>
//             )}
//         </motion.div>
//     );
// }

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { MathEngine } from '../../utils/mathEngine.js';
import { useCanvasStore } from '../../store/canvasStore.js';

export default function InteractiveNode({ id, data, selected, isConnectable }) {
    const { globalMetrics, updateGlobalMetrics } = useCanvasStore();
    const controlType = data.controlType || 'metric';

    const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
    const [toggleState, setToggleState] = useState(data.defaultState ?? true);
    const [mathResults, setMathResults] = useState({});
    const [gatePassed, setGatePassed] = useState(false);

    // FIX 2: The Physical Circuit Breaker to prevent AI logic loops (i = i + 1)
    const loopBreaker = useRef(0);

    // 1. Math Evaluation Logic
    useEffect(() => {
        if (controlType === 'math' && Array.isArray(data.formulas)) {

            // If the breaker is tripped, halt execution immediately
            if (loopBreaker.current > 5) {
                console.warn(`[Circuit Breaker] Node ${id} halted to prevent infinite loop.`);
                return;
            }

            const scope = { ...globalMetrics };
            const computedResults = MathEngine.processFormulas(data.formulas, scope);

            setMathResults(computedResults);

            let hasChanges = false;
            for (const key in computedResults) {
                const newVal = typeof computedResults[key] === 'object' && computedResults[key] !== null
                    ? JSON.stringify(computedResults[key])
                    : computedResults[key];

                const oldVal = typeof globalMetrics[key] === 'object' && globalMetrics[key] !== null
                    ? JSON.stringify(globalMetrics[key])
                    : globalMetrics[key];

                if (newVal !== oldVal) {
                    hasChanges = true;
                    break;
                }
            }

            if (hasChanges) {
                loopBreaker.current += 1; // Tick the breaker
                updateGlobalMetrics({ ...globalMetrics, ...computedResults });

                // Cool down the breaker after 1 second so normal user interactions can resume
                setTimeout(() => {
                    loopBreaker.current = 0;
                }, 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalMetrics, controlType, data.formulas]);

    // 2. Decision Gate Logic
    useEffect(() => {
        if (controlType === 'gate' && data.condition) {
            const passed = MathEngine.evaluateCondition(data.condition, globalMetrics);
            setGatePassed(passed);
        }
    }, [globalMetrics, controlType, data.condition]);

    const handleSliderChange = (e) => {
        const val = Number(e.target.value);
        setSliderVal(val);
        const metricKey = data.metricKey || id;
        updateGlobalMetrics({ ...globalMetrics, [metricKey]: val });
    };

    const handleToggle = () => {
        const next = !toggleState;
        setToggleState(next);
        const metricKey = data.metricKey || id;
        updateGlobalMetrics({ ...globalMetrics, [metricKey]: next });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`min-w-[180px] p-3 rounded-xl bg-slate-900 border text-slate-100 shadow-xl transition-all ${selected ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700'
                }`}
        >
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {controlType}
                </span>
                <span className="text-[10px] font-mono text-blue-400">
                    {data.label || id}
                </span>
            </div>

            {controlType === 'slider' && (
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Value:</span>
                        <span className="text-emerald-400 font-semibold">{sliderVal}</span>
                    </div>
                    <input
                        type="range"
                        min={data.min ?? 0}
                        max={data.max ?? 100}
                        value={sliderVal}
                        onChange={handleSliderChange}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            )}

            {controlType === 'toggle' && (
                <div className="flex items-center justify-between py-1">
                    <span className="text-xs text-slate-300 font-mono">State</span>
                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggleState ? 'bg-emerald-600' : 'bg-slate-700'
                            }`}
                    >
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className={`bg-white w-4 h-4 rounded-full shadow-md ${toggleState ? 'ml-auto' : ''
                                }`}
                        />
                    </button>
                </div>
            )}

            {controlType === 'math' && (
                <div className="space-y-1 font-mono text-xs">
                    {Object.keys(mathResults).length > 0 ? (
                        Object.entries(mathResults).map(([key, val]) => {
                            let displayValue = val;
                            if (typeof val === 'number') {
                                displayValue = val.toFixed(2);
                            } else if (typeof val === 'object' && val !== null) {
                                displayValue = JSON.stringify(val);
                            } else {
                                displayValue = String(val);
                            }

                            return (
                                <div key={key} className="flex justify-between items-center bg-slate-800/60 px-2 py-1.5 rounded mt-1 overflow-hidden">
                                    <span className="text-slate-300 shrink-0 mr-2">{key}:</span>
                                    <span className="text-blue-400 font-semibold truncate" title={displayValue}>
                                        {displayValue}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-[11px] text-slate-500 italic">No output...</div>
                    )}
                </div>
            )}

            {controlType === 'gate' && (
                <div className="space-y-1.5 font-mono text-xs text-center">
                    <div className="text-[10px] text-slate-400 truncate" title={data.condition}>{data.condition}</div>
                    <div
                        className={`py-1 rounded font-bold uppercase tracking-wider text-[11px] ${gatePassed
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/50'
                                : 'bg-rose-950/80 text-rose-400 border border-rose-600/50'
                            }`}
                    >
                        {gatePassed ? 'Pass' : 'Reject'}
                    </div>
                </div>
            )}
        </motion.div>
    );
}