import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, useReactFlow, useNodeConnections, useNodesData } from '@xyflow/react';
import NodeWrapper from './NodeWrapper.jsx';
import { MathEngine } from '../../utils/mathEngine.js';
import { useCanvasStore } from '../../store/canvasStore.js';

import { SliderControl, ToggleControl, MathControl, GateControl } from '../controls/index.js';

export default function InteractiveNode({ id, data, selected, isConnectable }) {
    const { updateNodeData } = useReactFlow();
    const { globalMetrics, updateGlobalMetrics } = useCanvasStore();

    const controlType = data.controlType || 'slider';
    const [isGlobal, setIsGlobal] = useState(data.isGlobal ?? false);

    // ============================================================================
    // 1. STRICT PORT CONFIGURATION (2 Inputs MAX, 1 Output Standard)
    // ============================================================================
    const hasInput1 = ['slider', 'math', 'gate', 'toggle'].includes(controlType);
    const hasInput2 = ['slider', 'math', 'gate'].includes(controlType);

    const nodeVarName = data.label || data.metricKey || 'out';

    // ============================================================================
    // 2. THE JSON REACTIVITY ENGINE (Strictly Isolated by ID)
    // ============================================================================
    const targetConnections = useNodeConnections({ id, type: 'target' }) || [];
    const sourceNodesData = useNodesData(targetConnections.map(c => c.source)) || [];

    const incomingJsonScope = useMemo(() => {
        let scope = {};
        targetConnections.forEach(conn => {
            const sourceData = sourceNodesData.find(n => n.id === conn.source)?.data;
            if (sourceData?.outputValues?.out) {
                const payload = sourceData.outputValues.out;
                if (typeof payload === 'object' && payload !== null) {
                    scope = { ...scope, ...payload };
                }
            }
        });
        return scope;
    }, [targetConnections, sourceNodesData]);

    const isWiredToggle = controlType === 'toggle' && targetConnections.length > 0;

    // ============================================================================
    // 3. EXECUTION STATE
    // ============================================================================
    const [sliderVal, setSliderVal] = useState(data.value ?? data.min ?? 0);
    const [toggleState, setToggleState] = useState(data.defaultState ?? false);
    const [mathResults, setMathResults] = useState({});
    const [gatePassed, setGatePassed] = useState(false);

    const prevOutRef = useRef(data.outputValues?.out ?? null);
    const updateTimeoutRef = useRef(null);

    // ============================================================================
    // 4. DEBOUNCED DISPATCH ENGINE (Industry Standard Input Stabilizer)
    // ============================================================================
    useEffect(() => {
        let rawVal = null;
        const activeScope = isGlobal ? globalMetrics : incomingJsonScope;

        if (controlType === 'slider') {
            rawVal = sliderVal;
        } else if (controlType === 'toggle') {
            if (isWiredToggle) {
                const incomingValues = Object.values(incomingJsonScope);
                const forcedState = incomingValues.length > 0 ? Boolean(incomingValues[0]) : toggleState;
                if (toggleState !== forcedState) setToggleState(forcedState);
                rawVal = forcedState;
            } else {
                rawVal = toggleState;
            }
        } else if (controlType === 'math') {
            const formulaStr = data.formula || (Array.isArray(data.formulas) ? data.formulas[0] : null);
            if (formulaStr) {
                let finalFormula = formulaStr;
                if (!finalFormula.includes('=')) {
                    finalFormula = `${nodeVarName} = ${finalFormula}`;
                }
                const computedResults = MathEngine.processFormula(finalFormula, activeScope);
                setMathResults(computedResults);
                rawVal = computedResults[nodeVarName] ?? Object.values(computedResults)[0] ?? 0;
            }
        } else if (controlType === 'gate') {
            if (data.condition) {
                const passed = MathEngine.evaluateCondition(data.condition, activeScope);
                setGatePassed(passed);
                rawVal = passed;
            }
        }

        if (rawVal !== null) {
            const newOutputJson = { [nodeVarName]: rawVal };

            if (JSON.stringify(newOutputJson) !== JSON.stringify(prevOutRef.current)) {

                // CRITICAL FIX: Clear the timer if the user is still actively dragging
                if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

                // DYNAMIC DELAY: 300ms for heavy human slider input, 50ms for instant machine logic snaps
                const delay = controlType === 'slider' ? 300 : 50;

                updateTimeoutRef.current = setTimeout(() => {
                    prevOutRef.current = newOutputJson;

                    // Dispatch the payload to downstream nodes AND save the local UI state to React Flow
                    updateNodeData(id, {
                        outputValues: { out: newOutputJson },
                        ...(controlType === 'slider' && { value: rawVal }),
                        ...(controlType === 'toggle' && { defaultState: rawVal })
                    });

                    // Sync to global metrics if this node is acting as a global controller
                    if (isGlobal && (controlType === 'slider' || controlType === 'toggle')) {
                        updateGlobalMetrics({ [nodeVarName]: rawVal });
                    }
                }, delay);
            }
        }

        // Cleanup function to prevent memory leaks if the node is deleted while processing
        return () => {
            if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
        };
    }, [isGlobal, globalMetrics, incomingJsonScope, sliderVal, toggleState, isWiredToggle, controlType, data.formula, data.formulas, data.condition, id, nodeVarName, updateNodeData, updateGlobalMetrics]);

    // ============================================================================
    // 5. MANUAL USER INTERACTIONS (Decoupled from Global Store)
    // ============================================================================
    const handleSliderChange = (e) => {
        // Only updates the local 60fps UI. The useEffect Debouncer handles the global network dispatch.
        setSliderVal(parseFloat(e.target.value));
    };

    const handleToggle = () => {
        if (isWiredToggle) return;
        setToggleState(!toggleState);
    };

    const toggleMode = () => {
        setIsGlobal(!isGlobal);
        updateNodeData(id, { isGlobal: !isGlobal });
    };

    const typeConfig = {
        slider: { icon: "⎚", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
        gate: { icon: "◇", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
        math: { icon: "∑", color: "text-electric", bg: "bg-electric/10", border: "border-electric/30" },
        toggle: { icon: "⏻", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" }
    };
    const config = typeConfig[controlType] || typeConfig.slider;

    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={240} minHeight={120} defaultAnimation="none">
            <div className={`relative w-full h-full flex flex-col rounded-xl border transition-all duration-300 backdrop-blur-md bg-moon-900/95 ${selected ? 'border-electric shadow-[0_0_20px_var(--color-electric-glow)]' : 'border-moon-700 shadow-xl'}`}>

                {/* LAYER 1: STRICT 2-INPUT PORTS (Pure 'left' and 'left-2') */}
                {hasInput1 && (
                    <div className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 group/port1 z-20 ${hasInput2 ? 'top-1/3' : 'top-1/2'}`}>
                        <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="w-3 h-3 bg-moon-950 border-2 border-slate-500 rounded-full hover:border-electric transition-colors !relative !transform-none" />
                    </div>
                )}
                {hasInput2 && (
                    <div className="absolute left-0 top-2/3 -translate-x-1/2 -translate-y-1/2 group/port2 z-20">
                        <Handle type="target" position={Position.Left} id="left-2" isConnectable={isConnectable} className="w-3 h-3 bg-moon-950 border-2 border-slate-500 rounded-full hover:border-electric transition-colors !relative !transform-none" />
                    </div>
                )}

                {/* LAYER 2: STRICT 1-OUTPUT PORT (Pure 'right') */}
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 group/out z-20">
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="right"
                        isConnectable={isConnectable}
                        className={`w-3 h-3 bg-moon-950 border-2 rounded-full hover:border-electric transition-colors !relative !transform-none ${(controlType === 'gate' && gatePassed) || (controlType === 'toggle' && toggleState)
                            ? 'border-emerald-500 bg-emerald-500/20'
                            : 'border-slate-500'
                            }`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-400 bg-moon-950 px-1 rounded pointer-events-none opacity-0 group-hover/out:opacity-100 border border-slate-700">
                        {nodeVarName}: {prevOutRef.current && prevOutRef.current[nodeVarName] !== undefined
                            ? (typeof prevOutRef.current[nodeVarName] === 'boolean'
                                ? (prevOutRef.current[nodeVarName] ? 'TRUE' : 'FALSE')
                                : Number(prevOutRef.current[nodeVarName]).toFixed(2))
                            : 'out'}
                    </span>
                </div>

                {/* THE HEADER */}
                <div className="flex items-center justify-between border-b border-moon-800 p-3 bg-moon-950/50 rounded-t-xl pointer-events-auto">
                    <div className="flex items-center gap-2 pointer-events-none">
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

                    {hasInput1 && (
                        <button
                            onClick={toggleMode}
                            className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border transition-colors ${isGlobal
                                ? 'bg-amber-900/30 text-amber-400 border-amber-500/50 hover:bg-amber-900/50'
                                : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                                }`}
                        >
                            {isGlobal ? 'Global' : 'Local'}
                        </button>
                    )}
                </div>

                {/* THE CONTROLS ZONE */}
                <div className={`flex-1 p-3 nodrag nopan flex flex-col justify-center ${isWiredToggle ? 'pointer-events-none opacity-60' : 'pointer-events-auto'}`}>
                    {controlType === 'slider' && <SliderControl data={data} value={sliderVal} onChange={handleSliderChange} />}
                    {controlType === 'toggle' && <ToggleControl state={toggleState} onToggle={handleToggle} />}
                    {controlType === 'math' && <MathControl results={mathResults} />}
                    {controlType === 'gate' && <GateControl condition={data.condition} passed={gatePassed} />}
                </div>
            </div>
        </NodeWrapper>
    );
}