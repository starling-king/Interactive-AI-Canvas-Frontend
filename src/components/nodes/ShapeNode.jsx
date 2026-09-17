import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

// 1. Import your SVG Geometry Library
import DiamondShape from '../shapes/DiamondShape';
import CylinderShape from '../shapes/CylinderShape';
import EllipseShape from '../shapes/EllipseShape';
import TriangleShape from '../shapes/TriangleShape';
import ParallelogramShape from '../shapes/ParallelogramShape';
import TrapezoidShape from '../shapes/TrapezoidShape';
import DocumentShape from '../shapes/DocumentShape';
import HexagonShape from '../shapes/HexagonShape';
import StarShape from '../shapes/StarShape';
import RectangleShape from '../shapes/RectangleShape';

// 2. Map AI shape strings to your components
const ShapeRegistry = {
    diamond: DiamondShape,
    cylinder: CylinderShape,
    ellipse: EllipseShape,
    triangle: TriangleShape,
    parallelogram: ParallelogramShape,
    trapezoid: TrapezoidShape,
    document: DocumentShape,
    hexagon: HexagonShape,
    star: StarShape,
    // Rectangle and Pill will be handled via pure CSS for better text wrapping in MVP
};

export default function ShapeNode({ data, selected, isConnectable }) {
    const shapeType = data.shapeType || 'rectangle';
    const isPill = shapeType === 'pill';
    const isPureCssRect = shapeType === 'rectangle';
    
    // Retrieve the SVG if it exists in the registry
    const SvgComponent = ShapeRegistry[shapeType];

    const isContainer = data.width && data.height;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}

            style={{
                width: isContainer ? `${data.width}px` : 'auto',
                height: isContainer ? `${data.height}px` : 'auto',
                zIndex: isContainer ? -1 : 1,
                pointerEvents: isContainer ? 'none' : 'auto' // Prevents container from stealing clicks from inner nodes
            }}

            className={`relative group flex items-center justify-center min-w-[120px] min-h-[80px] p-4 cursor-pointer ${
                selected ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'drop-shadow-lg'
            } ${isPill ? 'bg-slate-800 rounded-full border-2 border-slate-600' : ''} ${
                isPureCssRect ? 'bg-slate-800 rounded-xl border-2 border-slate-600' : ''
            }`}
        >
            {/* INVISIBLE HANDLES (Show on hover) */}
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" />
            <Handle type="source" position={Position.Left} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" id="left" />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="opacity-0 group-hover:opacity-100 w-3 h-3 bg-blue-500 border-none transition-opacity" id="right" />

            {/* THE SVG BACKGROUND (Only renders if it's not a pill/pure rect) */}
            {SvgComponent && (
                <div className="absolute inset-0 z-0 text-slate-800 flex items-center justify-center">
                    <SvgComponent className="w-full h-full text-slate-800" />
                </div>
            )}

            {/* THE FOREGROUND TEXT */}
            <div className="relative z-10 text-slate-200 text-sm font-semibold tracking-wide text-center max-w-[150px] break-words">
                {data.label || 'Node'}
            </div>
        </motion.div>
    );
}