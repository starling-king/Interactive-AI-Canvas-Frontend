import React from "react";
import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Import your exact drawing engine dictionaries (Single Source of Truth)
import { customNodeTypes, customEdgeTypes } from "../index.js";

// 1. HARDCODED DEMO DATA
// This simulates exactly what your Gemini backend returns.
const demoNodes = [
    {
        id: "cloud",
        type: "node_container",
        position: { x: 0, y: 0 },
        data: { label: "AWS Pipeline (Demo)", width: 850, height: 400 }
    },
    {
        id: "user",
        type: "node_icon",
        position: { x: 50, y: 160 },
        data: { iconType: "default" }
    },
    {
        id: "math",
        type: "node_interactive",
        position: { x: 220, y: 140 },
        data: { controlType: "math", formulas: ["tax = subtotal * 0.08", "total = subtotal + tax"] }
    },
    {
        id: "gate",
        type: "node_interactive",
        position: { x: 480, y: 150 },
        data: { controlType: "gate", condition: "total > 5000" }
    },
    {
        id: "db",
        type: "node_table",
        position: { x: 730, y: 100 },
        data: { title: "Orders_DB", rows: [{ name: "order_id", type: "string pk" }, { name: "total", type: "integer" }] }
    }
];

const demoEdges = [
    { id: "e1", source: "user", target: "math", type: "edge_orthogonal", animated: true },
    { id: "e2", source: "math", target: "gate", type: "edge_orthogonal", animated: true },
    { id: "e3", source: "gate", target: "db", type: "edge_kinetic", animated: true, label: "True" }
];

export default function InteractiveAiDemo() {
    return (
        <div className="relative w-full h-[500px] sm:h-[600px] glass-panel rounded-3xl overflow-hidden shadow-2xl gpu-layer group">

            {/* 2. LIVE STATUS BADGE: Adds cognitive ease and shows it's not a static image */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-moon-900/80 backdrop-blur-md border border-moon-800 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Live Engine Rendering
                </span>
            </div>

            {/* 3. THE READ-ONLY CANVAS */}
            <ReactFlow
                nodes={demoNodes}
                edges={demoEdges}
                nodeTypes={customNodeTypes}
                edgeTypes={customEdgeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                // Lock down interactions to make it act like a presentation video
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                zoomOnScroll={false}
                panOnDrag={false}
                preventScrolling={false}
                className="touch-none"
            >
                <Background color="#1e293b" gap={24} size={2} />
            </ReactFlow>

            {/* 4. LATERAL THINKING OVERLAY: Fades the edges into your background */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-moon-800/50 shadow-[inset_0_0_40px_rgba(2,6,23,0.8)]" />
        </div>
    );
}