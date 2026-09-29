import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import NodeWrapper from './NodeWrapper.jsx';

export default function ContainerNode({ id, data, selected, isConnectable }) {
    const { updateNodeData } = useReactFlow();

    // 1. LOCAL STATE BUFFER
    // Holds the text while typing so we don't lag the global canvas
    const [isEditing, setIsEditing] = useState(false);
    const [localLabel, setLocalLabel] = useState(data.label || 'Grouping Container');

    const handleBlur = () => {
        setIsEditing(false);
        updateNodeData(id, { label: localLabel });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleBlur();
    };

    return (
        // defaultAnimation="none" ensures this acts strictly as a static background zone
        <NodeWrapper id={id} data={data} selected={selected} defaultAnimation="none" isContainer={true} minWidth={250} minHeight={150}>

            {/* THE SAFE ZONE: relative positioning allows us to stack layers absolutely inside it */}
            <div className="relative w-full h-full pointer-events-auto group">

                {/* 
                  LAYER 1: THE PERFECT BOUNDARY
                  'absolute inset-0' forces this div to stretch perfectly to the four corners of the NodeWrapper.
                  This eliminates all flexbox blowouts and keeps the dashed border mathematically precise.
                */}
                <div className={`absolute inset-0 border-2 border-dashed rounded-xl pointer-events-none transition-colors ${selected ? 'border-blue-500/60 bg-blue-500/5' : 'border-slate-600/40 bg-slate-900/20 group-hover:border-slate-500/60'
                    }`} />

                {/* 
                  LAYER 2: THE INVISIBLE ROUTING HANDLES 
                  These sit exactly on the edges of the box, allowing the AI to connect arrows from any side.
                */}
                {/* <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />

                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />

                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />

                <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" /> */}

                {/* LAYER 2: The Interaction Layer (Handles & Text) */}
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

                {/* 
                  LAYER 3: THE EDITABLE TAG HEADER 
                  'absolute top-0 left-0' locks this badge into the corner.
                  'rounded-tl-xl' precisely matches the corner radius of Layer 1 to prevent corner bleeding.
                */}
                <div
                    onDoubleClick={() => setIsEditing(true)}
                    className={`absolute top-0 left-0 px-4 py-2 border-b-2 border-r-2 border-dashed rounded-tl-xl rounded-br-xl backdrop-blur-md cursor-text transition-colors z-10 ${selected ? 'border-blue-500/60 bg-blue-900/40' : 'border-slate-600/40 bg-slate-900/80 hover:bg-slate-800'
                        }`}
                >
                    {isEditing ? (
                        <input
                            autoFocus
                            value={localLabel}
                            onChange={(e) => setLocalLabel(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            // 'nodrag nopan' protects the input so the user doesn't drag the whole container while typing
                            className="bg-transparent text-[10px] font-bold tracking-widest uppercase text-electric outline-none border-b border-electric min-w-[140px] nodrag nopan pointer-events-auto"
                            placeholder="Container Name"
                        />
                    ) : (
                        <span className={`text-[10px] font-bold tracking-widest uppercase ${selected ? 'text-blue-300' : 'text-slate-400'}`}>
                            {localLabel}
                        </span>
                    )}
                </div>

            </div>
        </NodeWrapper>
    );
}