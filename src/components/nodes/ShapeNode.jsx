// import React, { useState } from 'react';
// import { Handle, Position, useReactFlow } from '@xyflow/react';
// import NodeWrapper from './NodeWrapper';

// // 1. The Complete Pure CSS Geometry Dictionary
// // This permanently replaces the need for SVG files.
// export const CSS_SHAPES = {
//     rectangle: { clipPath: 'none', borderRadius: '12px' },
//     pill: { clipPath: 'none', borderRadius: '9999px' },
//     ellipse: { clipPath: 'none', borderRadius: '50%' },
//     cylinder: { clipPath: 'none', borderRadius: '50% / 15%' }, // 3D barrel perspective
//     diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0' },
//     hexagon: { clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', borderRadius: '0' },
//     triangle: { clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
//     parallelogram: { clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)', borderRadius: '0' },
//     trapezoid: { clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
//     document: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)', borderRadius: '0' }, // Folded corner
//     star: { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', borderRadius: '0' }
// };

// const COLOR_THEMES = {
//     slate: 'bg-slate-800 border-slate-600 text-slate-200',
//     blue: 'bg-blue-950 border-blue-500 text-blue-100',
//     rose: 'bg-rose-950 border-rose-500 text-rose-100',
//     emerald: 'bg-emerald-950 border-emerald-500 text-emerald-100',
//     amber: 'bg-amber-950 border-amber-500 text-amber-100',
// };

// export default function ShapeNode({ id, data, selected, isConnectable }) {
//     const { updateNodeData } = useReactFlow();
//     const [isEditing, setIsEditing] = useState(false);
//     const [text, setText] = useState(data.label || 'Node');

//     const shapeType = data.shapeType || 'rectangle';
//     const geometry = CSS_SHAPES[shapeType] || CSS_SHAPES.rectangle;
//     const theme = data.colorTheme || 'slate';
//     const colorClasses = COLOR_THEMES[theme] || COLOR_THEMES.slate;

//     const saveText = () => {
//         setIsEditing(false);
//         updateNodeData(id, { label: text });
//     };

//     return (
//         <NodeWrapper id={id} data={data} selected={selected} minWidth={100} minHeight={60} defaultAnimation="float">
//             <div
//                 onDoubleClick={() => setIsEditing(true)}
//                 style={{
//                     clipPath: geometry.clipPath,
//                     borderRadius: geometry.borderRadius
//                 }}
//                 className={`relative w-full h-full flex items-center justify-center p-2 border-2 transition-colors duration-300 overflow-hidden ${colorClasses} ${selected ? 'shadow-[0_0_15px_rgba(255,255,255,0.15)] ring-2 ring-white/20' : 'shadow-lg'}`}
//             >
//                 <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
//                 <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
//                 <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
//                 <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

//                 <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

//                 <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

//                 <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

//                 <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

//                 <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
//                     {isEditing ? (
//                         <textarea
//                             autoFocus
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                             onBlur={saveText}
//                             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && saveText()}
//                             className="w-[90%] h-[90%] bg-black/40 text-current text-xs font-semibold tracking-wide text-center border border-current/50 rounded p-1 focus:outline-none pointer-events-auto resize-none backdrop-blur-sm"
//                         />
//                     ) : (
//                         <span className="text-current text-xs font-semibold tracking-wide text-center break-words max-w-[90%]">
//                             {data.label || 'Node'}
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </NodeWrapper>
//     );
// }

import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import NodeWrapper from './NodeWrapper.jsx';

// 1. THE GEOMETRY DICTIONARY
// This permanently replaces the need for SVG files. Pure CSS shapes scale infinitely without pixelation.
export const CSS_SHAPES = {
    rectangle: { clipPath: 'none', borderRadius: '12px' },
    pill: { clipPath: 'none', borderRadius: '9999px' },
    ellipse: { clipPath: 'none', borderRadius: '50%' },
    cylinder: { clipPath: 'none', borderRadius: '50% / 15%' }, // 3D barrel perspective
    diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0' },
    hexagon: { clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', borderRadius: '0' },
    triangle: { clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
    parallelogram: { clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)', borderRadius: '0' },
    trapezoid: { clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
    document: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)', borderRadius: '0' },
    star: { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', borderRadius: '0' }
};

const COLOR_THEMES = {
    slate: 'bg-slate-800 border-slate-600 text-slate-200',
    blue: 'bg-blue-950 border-blue-500 text-blue-100',
    rose: 'bg-rose-950 border-rose-500 text-rose-100',
    emerald: 'bg-emerald-950 border-emerald-500 text-emerald-100',
    amber: 'bg-amber-950 border-amber-500 text-amber-100',
};

export default function ShapeNode({ id, data, selected, isConnectable }) {
    const { updateNodeData } = useReactFlow();

    // NATIVE INTERACTION: Direct canvas editing state
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(data.label || 'Node');

    const shapeType = data.shapeType || 'rectangle';
    const geometry = CSS_SHAPES[shapeType] || CSS_SHAPES.rectangle;

    const theme = data.colorTheme || 'slate';
    const colorClasses = COLOR_THEMES[theme] || COLOR_THEMES.slate;

    // SCALABLE ANIMATION: 
    // We check if the user/AI explicitly set a default animation in the data object. 
    // If not, it defaults to "float". You can now easily map this to a dropdown in your NodeInspector!
    const activeAnimation = data.animationStyle || 'float';

    const saveText = () => {
        setIsEditing(false);
        updateNodeData(id, { label: text });
    };

    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={100} minHeight={80} defaultAnimation={activeAnimation}>

            {/* LAYER 1: The Physics Boundary */}
            {/* This parent element fills the React Flow resizer box but has NO clip-path, protecting the handles. */}
            <div
                className="relative w-full h-full flex items-center justify-center group"
                onDoubleClick={() => setIsEditing(true)}
            >

                {/* LAYER 2: The Visual Shape Layer */}
                {/* absolute inset-0 makes it stretch exactly to the parent's corners. Here is where we safely clip the geometry. */}
                <div
                    style={{
                        clipPath: geometry.clipPath,
                        borderRadius: geometry.borderRadius
                    }}
                    className={`absolute inset-0 border-2 transition-colors duration-300 pointer-events-none ${colorClasses} ${selected ? 'shadow-[0_0_20px_var(--color-electric-glow)] border-electric' : 'shadow-lg'
                        }`}
                />

                {/* LAYER 3: The Interaction Layer (Handles & Text) */}
                {/* 8 Strict Overlapping Routing Handles matching your system logic */}
                <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Left} id="left" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="target" position={Position.Right} id="right" isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                {/* THE TEXT EDITOR */}
                {/* Uses a constrained w-[80%] so text doesn't bleed out of the edges of slanted shapes like Triangles */}
                <div className="relative z-10 w-[80%] h-[80%] flex items-center justify-center pointer-events-none">
                    {isEditing ? (
                        <textarea
                            autoFocus
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onBlur={saveText}
                            onKeyDown={(e) => {
                                // Shift+Enter allows a new line, Enter saves it
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    saveText();
                                }
                            }}
                            className="w-full h-full bg-black/40 text-current text-[11px] font-bold tracking-wide text-center border border-white/20 rounded p-1 focus:outline-none focus:border-electric pointer-events-auto resize-none backdrop-blur-sm overflow-hidden"
                        />
                    ) : (
                        <span className="text-current text-[11px] font-bold tracking-wide text-center break-words max-w-full drop-shadow-md">
                            {data.label || 'Node'}
                        </span>
                    )}
                </div>

            </div>
        </NodeWrapper>
    );
}