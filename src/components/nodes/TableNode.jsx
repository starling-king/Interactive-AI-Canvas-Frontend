// import React from 'react';
// import { Handle, Position } from '@xyflow/react';
// import NodeWrapper from './NodeWrapper';

// export default function TableNode({ id, data, selected, isConnectable }) {
//     const title = data.title || data.label || 'Entity';
//     const rows = Array.isArray(data.rows) ? data.rows : [];

//     return (
//         <NodeWrapper
//             id={id}
//             data={data}
//             selected={selected}
//             minWidth={220}
//             minHeight={120}
//             defaultAnimation="breathe" // THE FIX: Breathing is the default animation for databases
//         >
//             {/* THE FIX: Changed to flex flex-col to properly contain the header and scrollable rows */}
//             <div className={`relative group w-full h-full flex flex-col bg-slate-900/95 border rounded-xl overflow-hidden backdrop-blur-md transition-all ${selected ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-blue-500/20' : 'border-slate-700/80 hover:border-slate-500'
//                 }`}>

//                 {/* 8 Strict Overlapping Routing Handles matching InteractiveNode to prevent routing warnings */}
//                 {/* Top Handles (Blue) */}
//                 <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
//                 <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

//                 {/* Bottom Handles (Blue) */}
//                 <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
//                 <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

//                 {/* Left Handles (Emerald green for relational styling) */}
//                 <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
//                 <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

//                 {/* Right Handles (Emerald green for relational styling) */}
//                 <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
//                 <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

//                 {/* Table Header: Fixed at the top */}
//                 <div className="flex-none flex items-center justify-between px-3.5 py-2.5 bg-slate-800/80 border-b border-slate-700/80 pointer-events-none">
//                     <div className="flex items-center gap-2">
//                         {/* Database Table Icon */}
//                         <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <ellipse cx="12" cy="5" rx="9" ry="3" />
//                             <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
//                             <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
//                         </svg>
//                         <span className="font-semibold text-xs text-slate-100 font-mono tracking-tight truncate">
//                             {title}
//                         </span>
//                     </div>
//                     <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
//                         table
//                     </span>
//                 </div>

//                 {/* Table Body / Rows: flex-1 ensures it takes up remaining space, overflow-y-auto enables internal scrolling if AI makes node too small */}
//                 <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 pointer-events-auto custom-scrollbar">
//                     {rows.length > 0 ? (
//                         rows.map((row, index) => {
//                             const isPk = typeof row.type === 'string' && row.type.toLowerCase().includes('pk');
//                             return (
//                                 <div key={index} className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-800/40 transition-colors text-xs">
//                                     <span className="font-medium text-slate-200 font-mono text-[11px] truncate mr-2">
//                                         {row.name}
//                                     </span>
//                                     <span className={`font-mono text-[10px] shrink-0 ${isPk ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}>
//                                         {row.type}
//                                     </span>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <div className="px-3 py-2 text-[11px] text-slate-500 italic text-center font-mono">
//                             No columns defined
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </NodeWrapper>
//     );
// }

import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import NodeWrapper from './NodeWrapper.jsx';

export default function TableNode({ id, data, selected, isConnectable }) {
    const { updateNodeData } = useReactFlow();

    // 1. LOCAL STATE BUFFER FOR EDITING
    // We hold the data locally so the user can type fast without causing global canvas lag.
    const [isEditing, setIsEditing] = useState(false);
    const [localTitle, setLocalTitle] = useState(data.title || data.label || 'New_Table');
    const [localRows, setLocalRows] = useState(Array.isArray(data.rows) ? data.rows : []);

    // 2. SCALABLE ANIMATION
    // Defaults to a gentle "breathe" for databases, but allows the user/AI to override it.
    const activeAnimation = data.animationStyle || 'breathe';

    // 3. EDIT HANDLERS
    const handleSave = () => {
        setIsEditing(false);
        // Push the finalized local data back up to the React Flow global state
        updateNodeData(id, { title: localTitle, rows: localRows });
    };

    const handleAddRow = () => {
        setLocalRows([...localRows, { name: 'new_field', type: 'string' }]);
    };

    const handleUpdateRow = (index, field, value) => {
        const updatedRows = [...localRows];
        updatedRows[index][field] = value;
        setLocalRows(updatedRows);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = localRows.filter((_, i) => i !== index);
        setLocalRows(updatedRows);
    };

    return (
        <NodeWrapper
            id={id}
            data={data}
            selected={selected}
            minWidth={240}
            minHeight={120}
            defaultAnimation={activeAnimation}
        >
            <div
                onDoubleClick={() => !isEditing && setIsEditing(true)}
                className={`relative group w-full h-full flex flex-col bg-slate-900/95 border rounded-xl overflow-hidden backdrop-blur-md transition-all ${selected ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-blue-500/20' : 'border-slate-700/80 hover:border-slate-500'
                    }`}
            >
                {/* 8 Strict Overlapping Routing Handles (Top/Bottom = Blue, Left/Right = Emerald Relational) */}
                {/* <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" /> */}

                {/* Top Handles (Blue) */}
                <Handle type="target" position={Position.Top} id="top-target" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Top} id="top-source" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                {/* Bottom Handles (Blue) */}
                <Handle type="target" position={Position.Bottom} id="bottom-target" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom-source" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-blue-500 border border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                {/* Left Handles (Emerald green for relational styling) */}
                <Handle type="target" position={Position.Left} id="left-target" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Left} id="left-source" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -left-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                {/* Right Handles (Emerald green for relational styling) */}
                <Handle type="target" position={Position.Right} id="right-target" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <Handle type="source" position={Position.Right} id="right-source" isConnectable={isConnectable} className="w-2.5 h-2.5 bg-emerald-400 border border-slate-950 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                {/* THE HEADER */}
                <div className="flex-none flex items-center justify-between px-3.5 py-2.5 bg-slate-800/80 border-b border-slate-700/80 pointer-events-none">
                    <div className="flex items-center gap-2 w-full">
                        <svg className="w-4 h-4 text-blue-400 shrink-0 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>

                        {isEditing ? (
                            <input
                                autoFocus
                                value={localTitle}
                                onChange={(e) => setLocalTitle(e.target.value)}
                                className="w-full bg-transparent text-sm font-bold text-white border-b border-electric outline-none pointer-events-auto nodrag nopan"
                                placeholder="Table Name"
                            />
                        ) : (
                            <span className="font-bold text-sm text-slate-100 tracking-tight truncate drop-shadow-sm">
                                {localTitle}
                            </span>
                        )}
                    </div>
                    {!isEditing && (
                        <span className="ml-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                            table
                        </span>
                    )}
                </div>

                {/* THE BODY / ROWS */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar nodrag nopan pointer-events-auto">
                    {isEditing ? (
                        // EDIT MODE
                        <div className="p-2 space-y-2">
                            {localRows.map((row, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        value={row.name}
                                        onChange={(e) => handleUpdateRow(index, 'name', e.target.value)}
                                        className="flex-1 min-w-0 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-200 outline-none focus:border-electric"
                                        placeholder="Field Name"
                                    />
                                    <input
                                        value={row.type}
                                        onChange={(e) => handleUpdateRow(index, 'type', e.target.value)}
                                        className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-emerald-400 outline-none focus:border-emerald-500"
                                        placeholder="Type"
                                    />
                                    <button
                                        onClick={() => handleRemoveRow(index)}
                                        className="text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                                        title="Delete Row"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                            {/* Action Buttons for Edit Mode */}
                            <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-800/50">
                                <button
                                    onClick={handleAddRow}
                                    className="text-[10px] font-bold uppercase tracking-widest text-electric hover:text-blue-400 transition-colors flex items-center gap-1"
                                >
                                    <span>+</span> Add Row
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="text-[10px] font-bold uppercase tracking-widest bg-electric/10 text-electric hover:bg-electric border border-electric/20 hover:text-white px-3 py-1 rounded transition-all"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        // VIEW MODE (Matches Screenshot)
                        <>
                            {localRows.length > 0 ? (
                                localRows.map((row, index) => {
                                    const isPk = typeof row.type === 'string' && row.type.toLowerCase().includes('pk');
                                    return (
                                        <div key={index} className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-800/40 transition-colors pointer-events-none">
                                            <span className="font-medium text-slate-200 font-mono text-[11px] truncate mr-4 tracking-wide">
                                                {row.name}
                                            </span>
                                            <span className={`font-mono text-[10px] shrink-0 tracking-wider ${isPk ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'}`}>
                                                {row.type}
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="px-3 py-3 text-[11px] text-slate-500 italic text-center font-mono pointer-events-none">
                                    Double-click to add columns
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </NodeWrapper>
    );
}