import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export default function TextNode({ data, isConnectable }) {
    const [text, setText] = useState(data.text || "Type something...");

    return (
        <div className="relative group cursor-text p-2 min-w-[100px]">
            {/* INCOMING HANDLE (Hidden until hover) */}
            <Handle 
                type="target" 
                position={Position.Left} 
                isConnectable={isConnectable} 
                className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none"
            />

            {/* THE EDITABLE TEXT AREA */}
            <textarea
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 resize-none outline-none overflow-hidden font-sans text-base whitespace-pre-wrap"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type..."
                rows={text.split('\n').length || 1} // Auto-expands height based on line breaks
            />

            {/* OUTGOING HANDLE (Hidden until hover) */}
            <Handle 
                type="source" 
                position={Position.Right} 
                isConnectable={isConnectable} 
                className="opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 bg-slate-400 border-none"
            />
        </div>
    );
}