// import React, { useEffect,useMemo } from "react";
// import { ReactFlow, Background } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";

// // Import your global passive types, but we will selectively override the active ones
// import { customNodeTypes, customEdgeTypes } from "../index.js";
// import DemoInteractiveNode from "./DemoInteractiveNode.jsx";
// import { useDemoStore } from "../../store/demoStore.js"; // Connect to the isolated brain

// // 1. ISOLATED DEMO DICTIONARY (The Gatekeeper)
// // Inherit safe nodes (like icons), but inject our lightweight demo node for interactivity
// const demoNodeTypes = useMemo({
//     ...customNodeTypes,
//     node_interactive: DemoInteractiveNode,
// },[]);

// export default function InteractiveAiDemo() {
//     // 2. CONNECT TO THE ZUSTAND DEMO STORE
//     const { nodes, edges, onNodesChange, onEdgesChange, resetDemoStore } = useDemoStore();

//     // 3. MEMORY MANAGEMENT
//     // Clean up the demo state if the user navigates to the sign-in page, keeping the browser fast
//     useEffect(() => {
//         return () => resetDemoStore();
//     }, [resetDemoStore]);

//     return (
//         <div className="relative w-full h-[500px] sm:h-[600px] glass-panel rounded-3xl overflow-hidden shadow-2xl gpu-layer group border border-moon-800">

//             {/* 4. LIVE STATUS BADGE */}
//             <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-moon-900/80 backdrop-blur-md border border-moon-800 rounded-full shadow-lg flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
//                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
//                     Live Engine Rendering
//                 </span>
//             </div>

//             {/* 5. THE REACT FLOW ENGINE */}
//             <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange} // Allows local UI tracking
//                 onEdgesChange={onEdgesChange}
//                 nodeTypes={demoNodeTypes}
//                 edgeTypes={customEdgeTypes}
//                 fitView
//                 fitViewOptions={{ padding: 0.15 }}
//                 proOptions={{ hideAttribution: true }}

//                 // DEMO LOCKS: Prevent destruction of the cinematic layout
//                 nodesDraggable={false}
//                 nodesConnectable={false}
//                 elementsSelectable={true} // Must be true so users can drag the slider
//                 zoomOnScroll={false}
//                 panOnDrag={false}
//                 preventScrolling={false}
//                 className="touch-none"
//             >
//                 <Background color="#1e293b" gap={24} size={2} />
//             </ReactFlow>

//             {/* LATERAL OVERLAY: Blends the strict edges into the dark theme */}
//             <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-moon-800/50 shadow-[inset_0_0_40px_rgba(2,6,23,0.8)]" />
//         </div>
//     );
// }


import React, { useEffect, useMemo } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Import your global passive types
import { customNodeTypes, customEdgeTypes } from "../index.js";
import DemoInteractiveNode from "./DemoInteractiveNode.jsx";
import { useDemoStore } from "../../store/demoStore.js";

export default function InteractiveAiDemo() {
    const { nodes, edges, onNodesChange, onEdgesChange, resetDemoStore } = useDemoStore();

    // THE FIX: Wrap the dictionary in useMemo inside the component.
    // This guarantees customNodeTypes is fully initialized before we try to spread it.
    const demoNodeTypes = useMemo(() => ({
        ...customNodeTypes,
        node_interactive: DemoInteractiveNode,
    }), []);

    // Clean up the demo state if the user navigates away
    useEffect(() => {
        return () => resetDemoStore();
    }, [resetDemoStore]);

    return (
        <div className="relative w-full h-[500px] sm:h-[600px] glass-panel rounded-3xl overflow-hidden shadow-2xl gpu-layer group border border-moon-800">

            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-moon-900/80 backdrop-blur-md border border-moon-800 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    Live Engine Rendering
                </span>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={demoNodeTypes}
                edgeTypes={customEdgeTypes}
                fitView
                fitViewOptions={{ padding: 0.15 }}
                proOptions={{ hideAttribution: true }}

                // DEMO LOCKS
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
                zoomOnScroll={false}
                panOnDrag={false}
                preventScrolling={false}
                className="touch-none"
            >
                <Background color="#1e293b" gap={24} size={2} />
            </ReactFlow>

            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-moon-800/50 shadow-[inset_0_0_40px_rgba(2,6,23,0.8)]" />
        </div>
    );
}