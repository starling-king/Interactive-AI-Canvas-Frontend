import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export default function TextNode({ data, isConnectable }) {
    const [text, setText] = useState(data.text || "Type something...");

    return (
        <div className="relative group cursor-text p-2 min-w-[100px]">
            {/* THE FIX: All 4 handles must exist so the AI can route wires from any direction */}
            <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />
            <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />

            <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />
            <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />

            <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />
            <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />

            <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />
            <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none" />

            {/* THE EDITABLE TEXT AREA */}
            <textarea
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 resize-none outline-none overflow-hidden font-sans text-base whitespace-pre-wrap"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type..."
                rows={text.split('\n').length || 1}
            />
        </div>
    );
}