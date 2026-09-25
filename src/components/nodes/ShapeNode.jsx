// // // // import { Handle, Position } from '@xyflow/react';
// // // // import { motion } from 'framer-motion';

// // // // // 1. Import your SVG Geometry Library
// // // // import DiamondShape from '../shapes/DiamondShape';
// // // // import CylinderShape from '../shapes/CylinderShape';
// // // // import EllipseShape from '../shapes/EllipseShape';
// // // // import TriangleShape from '../shapes/TriangleShape';
// // // // import ParallelogramShape from '../shapes/ParallelogramShape';
// // // // import TrapezoidShape from '../shapes/TrapezoidShape';
// // // // import DocumentShape from '../shapes/DocumentShape';
// // // // import HexagonShape from '../shapes/HexagonShape';
// // // // import StarShape from '../shapes/StarShape';
// // // // import RectangleShape from '../shapes/RectangleShape';

// // // // // 2. Map AI shape strings to your components
// // // // const ShapeRegistry = {
// // // //     diamond: DiamondShape,
// // // //     cylinder: CylinderShape,
// // // //     ellipse: EllipseShape,
// // // //     triangle: TriangleShape,
// // // //     parallelogram: ParallelogramShape,
// // // //     trapezoid: TrapezoidShape,
// // // //     document: DocumentShape,
// // // //     hexagon: HexagonShape,
// // // //     star: StarShape,
// // // //     // Rectangle and Pill will be handled via pure CSS for better text wrapping in MVP
// // // // };

// // // // export default function ShapeNode({ data, selected, isConnectable }) {
// // // //     const shapeType = data.shapeType || 'rectangle';
// // // //     const isPill = shapeType === 'pill';
// // // //     const isPureCssRect = shapeType === 'rectangle';

// // // //     // Retrieve the SVG if it exists in the registry
// // // //     const SvgComponent = ShapeRegistry[shapeType];

// // // //     const isContainer = data.width && data.height;

// // // //     return (
// // // //         <motion.div
// // // //             initial={{ opacity: 0, scale: 0.8 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             transition={{ type: 'spring', stiffness: 200, damping: 15 }}

// // // //             style={{
// // // //                 width: isContainer ? `${data.width}px` : 'auto',
// // // //                 height: isContainer ? `${data.height}px` : 'auto',
// // // //                 zIndex: isContainer ? -1 : 1,
// // // //                 pointerEvents: isContainer ? 'none' : 'auto' // Prevents container from stealing clicks from inner nodes
// // // //             }}

// // // //             className={`relative group flex items-center justify-center min-w-[120px] min-h-[80px] p-4 cursor-pointer ${
// // // //                 selected ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'drop-shadow-lg'
// // // //             } ${isPill ? 'bg-slate-800 rounded-full border-2 border-slate-600' : ''} ${
// // // //                 isPureCssRect ? 'bg-slate-800 rounded-xl border-2 border-slate-600' : ''
// // // //             }`}
// // // //         >
// // // //             {/* INVISIBLE HANDLES (Show on hover) */}
// // // //             <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" />
// // // //             <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" />
// // // //             <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" id="left" />
// // // //             <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" id="right" />

// // // //             {/* THE SVG BACKGROUND (Only renders if it's not a pill/pure rect) */}
// // // //             {SvgComponent && (
// // // //                 <div className="absolute inset-0 z-0 text-slate-800 flex items-center justify-center">
// // // //                     <SvgComponent className="w-full h-full text-slate-800" />
// // // //                 </div>
// // // //             )}

// // // //             {/* THE FOREGROUND TEXT */}
// // // //             <div className="relative z-10 text-slate-200 text-sm font-semibold tracking-wide text-center max-w-[150px] break-words">
// // // //                 {data.label || 'Node'}
// // // //             </div>
// // // //         </motion.div>
// // // //     );
// // // // }

// // // import { Handle, Position } from '@xyflow/react';
// // // import NodeWrapper from './NodeWrapper';

// // // import DiamondShape from '../shapes/DiamondShape';
// // // import CylinderShape from '../shapes/CylinderShape';
// // // import EllipseShape from '../shapes/EllipseShape';
// // // import TriangleShape from '../shapes/TriangleShape';
// // // import ParallelogramShape from '../shapes/ParallelogramShape';
// // // import TrapezoidShape from '../shapes/TrapezoidShape';
// // // import DocumentShape from '../shapes/DocumentShape';
// // // import HexagonShape from '../shapes/HexagonShape';
// // // import StarShape from '../shapes/StarShape';

// // // const ShapeRegistry = {
// // //     diamond: DiamondShape,
// // //     cylinder: CylinderShape,
// // //     ellipse: EllipseShape,
// // //     triangle: TriangleShape,
// // //     parallelogram: ParallelogramShape,
// // //     trapezoid: TrapezoidShape,
// // //     document: DocumentShape,
// // //     hexagon: HexagonShape,
// // //     star: StarShape,
// // // };

// // // export default function ShapeNode({ id, data, selected, isConnectable }) {
// // //     const shapeType = data.shapeType || 'rectangle';
// // //     const isPill = shapeType === 'pill';
// // //     const isPureCssRect = shapeType === 'rectangle';

// // //     const SvgComponent = ShapeRegistry[shapeType];

// // //     return (
// // //         <NodeWrapper id={id} data={data} selected={selected} minWidth={120} minHeight={80}>

// // //             <div className={`relative w-full h-full flex items-center justify-center p-4 transition-shadow ${selected ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'drop-shadow-lg'
// // //                 } ${isPill ? 'bg-slate-800 rounded-full border-2 border-slate-600' : ''} ${isPureCssRect ? 'bg-slate-800 rounded-xl border-2 border-slate-600' : ''
// // //                 }`}>

// // //                 {/* INVISIBLE HANDLES (Show on hover) */}
// // //                 <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity z-20" />
// // //                 <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity z-20" />
// // //                 <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity z-20" id="left" />
// // //                 <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity z-20" id="right" />

// // //                 {/* THE SVG BACKGROUND */}
// // //                 {SvgComponent && (
// // //                     <div className="absolute inset-0 z-0 text-slate-800 flex items-center justify-center pointer-events-none">
// // //                         <SvgComponent className="w-full h-full text-slate-800" />
// // //                     </div>
// // //                 )}

// // //                 {/* THE FOREGROUND TEXT */}
// // //                 <div className="relative z-10 text-slate-200 text-sm font-semibold tracking-wide text-center break-words pointer-events-none">
// // //                     {data.label || 'Node'}
// // //                 </div>
// // //             </div>

// // //         </NodeWrapper>
// // //     );
// // // }

// // import React, { useState } from 'react';
// // import { Handle, Position, useReactFlow } from '@xyflow/react';
// // import NodeWrapper from './NodeWrapper';

// // import DiamondShape from '../shapes/DiamondShape';
// // import CylinderShape from '../shapes/CylinderShape';
// // import EllipseShape from '../shapes/EllipseShape';
// // import TriangleShape from '../shapes/TriangleShape';
// // import ParallelogramShape from '../shapes/ParallelogramShape';
// // import TrapezoidShape from '../shapes/TrapezoidShape';
// // import DocumentShape from '../shapes/DocumentShape';
// // import HexagonShape from '../shapes/HexagonShape';
// // import StarShape from '../shapes/StarShape';

// // const ShapeRegistry = {
// //     diamond: DiamondShape, cylinder: CylinderShape, ellipse: EllipseShape,
// //     triangle: TriangleShape, parallelogram: ParallelogramShape, trapezoid: TrapezoidShape,
// //     document: DocumentShape, hexagon: HexagonShape, star: StarShape,
// // };

// // export default function ShapeNode({ id, data, selected, isConnectable }) {
// //     const { updateNodeData } = useReactFlow();

// //     // MS Paint Feature: Double Click to Edit
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [text, setText] = useState(data.label || 'Node');

// //     const shapeType = data.shapeType || 'rectangle';
// //     const isPill = shapeType === 'pill';
// //     const isPureCssRect = shapeType === 'rectangle';
// //     const SvgComponent = ShapeRegistry[shapeType];

// //     const saveText = () => {
// //         setIsEditing(false);
// //         updateNodeData(id, { label: text });
// //     };

// //     return (
// //         <NodeWrapper id={id} data={data} selected={selected} minWidth={120} minHeight={80}>

// //             <div
// //                 onDoubleClick={() => setIsEditing(true)}
// //                 className={`relative w-full h-full flex items-center justify-center p-4 transition-shadow ${selected ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'drop-shadow-lg'
// //                     } ${isPill ? 'bg-slate-800 rounded-full border-2 border-slate-600' : ''} ${isPureCssRect ? 'bg-slate-800 rounded-xl border-2 border-slate-600' : ''
// //                     }`}
// //             >

// //                 {/* INFINITE EDGE HANDLES: These span 100% of the borders so you can draw from anywhere */}
// //                 <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
// //                 <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
// //                 <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="left" />
// //                 <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="right" />

// //                 {/* THE SVG BACKGROUND */}
// //                 {SvgComponent && (
// //                     <div className="absolute inset-0 z-0 text-slate-800 flex items-center justify-center pointer-events-none">
// //                         <SvgComponent className="w-full h-full text-slate-800" />
// //                     </div>
// //                 )}

// //                 {/* THE FOREGROUND TEXT / TEXTAREA */}
// //                 <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
// //                     {isEditing ? (
// //                         <textarea
// //                             autoFocus
// //                             value={text}
// //                             onChange={(e) => setText(e.target.value)}
// //                             onBlur={saveText}
// //                             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && saveText()}
// //                             className="w-[90%] h-[90%] bg-slate-950/80 text-slate-100 text-sm font-semibold tracking-wide text-center border border-blue-500 rounded p-2 focus:outline-none pointer-events-auto resize-none"
// //                         />
// //                     ) : (
// //                         <span className="text-slate-200 text-sm font-semibold tracking-wide text-center break-words max-w-[90%]">
// //                             {data.label || 'Node'}
// //                         </span>
// //                     )}
// //                 </div>
// //             </div>

// //         </NodeWrapper>
// //     );
// // }

// import React, { useState } from 'react';
// import { Handle, Position, useReactFlow } from '@xyflow/react';
// import NodeWrapper from './NodeWrapper';

// // 1. Pure CSS Geometry Dictionary
// // Uses mathematical 'clip-path' to cut an HTML div into any shape natively
// const CSS_SHAPES = {
//     diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0' },
//     hexagon: { clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', borderRadius: '0' },
//     triangle: { clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
//     parallelogram: { clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', borderRadius: '0' },
//     trapezoid: { clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
//     rectangle: { clipPath: 'none', borderRadius: '12px' }, // Standard rounded rectangle
//     pill: { clipPath: 'none', borderRadius: '9999px' }     // Fully rounded pill
// };

// // 2. Dynamic AI Color Dictionary
// // The AI passes `data.colorTheme = "rose"` to instantly recolor the shape and text
// const COLOR_THEMES = {
//     slate: 'bg-slate-800 border-slate-600 text-slate-200',
//     blue: 'bg-blue-950 border-blue-500 text-blue-100',
//     rose: 'bg-rose-950 border-rose-500 text-rose-100',
//     emerald: 'bg-emerald-950 border-emerald-500 text-emerald-100',
//     amber: 'bg-amber-950 border-amber-500 text-amber-100',
// };

// export default function ShapeNode({ id, data, selected, isConnectable }) {
//     const { updateNodeData } = useReactFlow();

//     // MS Paint Feature: Double Click to Edit
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
//         <NodeWrapper id={id} data={data} selected={selected} minWidth={100} minHeight={60}>

//             {/* 3. THE PURE HTML SHAPE CONTAINER */}
//             <div
//                 onDoubleClick={() => setIsEditing(true)}
//                 style={{
//                     clipPath: geometry.clipPath,
//                     borderRadius: geometry.borderRadius
//                 }}
//                 className={`relative w-full h-full flex items-center justify-center p-4 border-2 transition-all duration-300 ${colorClasses} ${selected ? 'shadow-[0_0_15px_rgba(255,255,255,0.15)] ring-2 ring-white/20' : 'shadow-lg'
//                     }`}
//             >

//                 {/* 4. INFINITE EDGE HANDLES (Omni-directional wiring) */}
//                 <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
//                 <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
//                 <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="left" />
//                 <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="right" />

//                 {/* 5. THE HTML FOREGROUND TEXT / TEXTAREA */}
//                 <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
//                     {isEditing ? (
//                         <textarea
//                             autoFocus
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                             onBlur={saveText}
//                             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && saveText()}
//                             className="w-[90%] h-[90%] bg-black/40 text-current text-sm font-semibold tracking-wide text-center border border-current/50 rounded p-1 focus:outline-none pointer-events-auto resize-none backdrop-blur-sm"
//                         />
//                     ) : (
//                         <span className="text-current text-sm font-semibold tracking-wide text-center break-words max-w-[90%]">
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
import NodeWrapper from './NodeWrapper';

// 1. Pure CSS Geometry Dictionary
const CSS_SHAPES = {
    diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', borderRadius: '0' },
    hexagon: { clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', borderRadius: '0' },
    triangle: { clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
    parallelogram: { clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)', borderRadius: '0' },
    trapezoid: { clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', borderRadius: '0' },
    rectangle: { clipPath: 'none', borderRadius: '12px' },
    pill: { clipPath: 'none', borderRadius: '9999px' }
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

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(data.label || 'Node');

    const shapeType = data.shapeType || 'rectangle';
    const geometry = CSS_SHAPES[shapeType] || CSS_SHAPES.rectangle;

    const theme = data.colorTheme || 'slate';
    const colorClasses = COLOR_THEMES[theme] || COLOR_THEMES.slate;

    const saveText = () => {
        setIsEditing(false);
        updateNodeData(id, { label: text });
    };

    return (
        <NodeWrapper id={id} data={data} selected={selected} minWidth={20} minHeight={20}>

            <div
                onDoubleClick={() => setIsEditing(true)}
                style={{
                    clipPath: geometry.clipPath,
                    borderRadius: geometry.borderRadius
                }}
                className={`relative w-full h-full flex items-center justify-center p-1 border-2 transition-colors duration-300 overflow-hidden ${colorClasses} ${selected ? 'shadow-[0_0_15px_rgba(255,255,255,0.15)] ring-2 ring-white/20' : 'shadow-lg'
                    }`}
            >

                {/* INFINITE EDGE HANDLES */}
                <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Top} id="top" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                <Handle type="target" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-full h-3 bg-blue-500/50 rounded-none border-none transition-opacity z-20" />

                <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="left" />
                <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="left" />

                <Handle type="target" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="right" />
                <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 hover:opacity-100 w-3 h-full bg-blue-500/50 rounded-none border-none transition-opacity z-20" id="right" />

                {/* THE TEXTAREA */}
                <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                    {isEditing ? (
                        <textarea
                            autoFocus
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onBlur={saveText}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && saveText()}
                            className="w-[90%] h-[90%] bg-black/40 text-current text-[10px] sm:text-xs font-semibold tracking-wide text-center border border-current/50 rounded p-1 focus:outline-none pointer-events-auto resize-none backdrop-blur-sm"
                        />
                    ) : (
                        <span className="text-current text-[10px] sm:text-xs font-semibold tracking-wide text-center break-words max-w-[90%]">
                            {data.label || 'Node'}
                        </span>
                    )}
                </div>
            </div>

        </NodeWrapper>
    );
}