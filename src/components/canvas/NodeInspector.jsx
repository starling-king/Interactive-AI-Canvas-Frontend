import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCanvasStore } from '../../store/canvasStore.js';

import GlassCard from '../ui/GlassCard.jsx';
import GlassInput from '../ui/GlassInput.jsx';
import ElectricButton from '../ui/ElectricButton.jsx';

export default function NodeInspector({ selectedNode, onClose }) {
    const { nodes, onNodesChange } = useCanvasStore();
    const [localData, setLocalData] = useState(null);

    // Sync local state when a new node is selected
    useEffect(() => {
        if (selectedNode) {
            setLocalData(selectedNode.data);
        } else {
            setLocalData(null);
        }
    }, [selectedNode]);

    // Handle updates to the form fields
    const handleChange = (field, value) => {
        setLocalData(prev => ({ ...prev, [field]: value }));
    };

    // Array specific handler for math formulas
    const handleFormulaChange = (index, value) => {
        const newFormulas = [...(localData.formulas || [])];
        newFormulas[index] = value;
        handleChange('formulas', newFormulas);
    };

    const handleSave = () => {
        if (!selectedNode || !localData) return;

        // Construct a React Flow change object to mutate the specific node
        const change = {
            id: selectedNode.id,
            type: 'replace',
            item: {
                ...selectedNode,
                data: localData
            }
        };

        // Push the change to the global Zustand store
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

                        {/* Header */}
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

                        {/* Scrollable Form Body */}
                        <div className="flex-1 overflow-y-auto space-y-5 no-scrollbar pr-2">

                            {/* Standard Label/Text Editing */}
                            {(selectedNode.type === 'node_shape' || selectedNode.type === 'node_interactive') && (
                                <GlassInput
                                    label="Label"
                                    value={localData.label || ''}
                                    onChange={(e) => handleChange('label', e.target.value)}
                                    placeholder="Node Name"
                                />
                            )}

                            {/* Interactive Slider Config */}
                            {localData.controlType === 'slider' && (
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
                            )}

                            {/* Interactive Gate Config */}
                            {localData.controlType === 'gate' && (
                                <GlassInput
                                    label="Condition (e.g. x > 10)"
                                    value={localData.condition || ''}
                                    onChange={(e) => handleChange('condition', e.target.value)}
                                    placeholder="Evaluation string"
                                />
                            )}

                            {/* Interactive Math Config */}
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

                        {/* Footer Action */}
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