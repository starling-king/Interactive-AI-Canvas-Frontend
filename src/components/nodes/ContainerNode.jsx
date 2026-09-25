// import React from 'react';
// import NodeWrapper from './NodeWrapper';

// export default function ContainerNode({ id, data, selected }) {
//     return (
//         // Containers need a larger default minimum size
//         <NodeWrapper id={id} data={data} selected={selected} minWidth={200} minHeight={150}>
//             <div className="w-full h-full border-2 border-dashed border-slate-700 bg-slate-900/20 rounded-2xl flex flex-col pointer-events-none">
//                 <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 rounded-t-2xl w-max backdrop-blur-sm pointer-events-auto">
//                     <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
//                         {data.label || 'Grouping Container'}
//                     </span>
//                 </div>
//             </div>
//         </NodeWrapper>
//     );
// }

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeWrapper from './NodeWrapper';

export default function ContainerNode({ id, data, selected, isConnectable }) {
    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={200} minHeight={150}>
            <div className="w-full h-full border-2 border-dashed border-slate-600 bg-slate-900/10 rounded-2xl flex flex-col pointer-events-none">

                {/* THE FIX: Add invisible ghost handles so the AI can route wires to containers */}
                <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />

                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 w-full h-3 bg-transparent rounded-none border-none z-20" />

                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />

                <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 w-3 h-full bg-transparent rounded-none border-none z-20" />

                <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-700 rounded-t-2xl w-max backdrop-blur-sm pointer-events-auto">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
                        {data.label || 'Grouping Container'}
                    </span>
                </div>
            </div>
        </NodeWrapper>
    );
}