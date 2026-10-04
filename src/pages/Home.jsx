// import { useNavigate } from "react-router-dom";
// import { ReactFlow, Background, ReactFlowProvider } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { ElectricButton, customNodeTypes, customEdgeTypes } from "../components/index.js";

// // --- THE DEMO GRAPH DATA ---
// // THE FIX: Repositioned nodes into a compact, cinematic layout that looks perfect inside the 500px tall window.
// // 1. HARDCODED DEMO DATA
// const demoNodes = [
//     {
//         id: "user",
//         type: "node_icon",
//         position: { x: 50, y: 150 },
//         data: { iconType: "default", label: "USER INPUT", animationStyle: "pulse" }
//     },
//     {
//         id: "slider-1",
//         type: "node_interactive",
//         position: { x: 300, y: 140 },
//         data: { controlType: "slider", label: "Subtotal", metricKey: "demo_subtotal", value: 5500, min: 100, max: 15000, isGlobal: false }
//     },
//     {
//         id: "gate-1",
//         type: "node_interactive",
//         position: { x: 620, y: 150 },
//         data: { controlType: "gate", label: "High Value Check", condition: "demo_subtotal > 5000", isGlobal: false }
//     },
//     {
//         id: "db-1",
//         type: "node_table",
//         position: { x: 920, y: 100 },
//         data: { title: "Orders_DB", rows: [{ name: "order_id", type: "string pk" }, { name: "total", type: "integer" }] }
//     }
// ];

// // 2. PRECISION EDGE ROUTING
// const demoEdges = [
//     {
//         id: "e1",
//         source: "user",
//         target: "slider-1",
//         sourceHandle: "right-source", // Plugs into IconNode's right exit
//         targetHandle: "left",         // Plugs into InteractiveNode's left entrance
//         type: "edge_orthogonal",
//         animated: true
//     },
//     {
//         id: "e2",
//         source: "slider-1",
//         target: "gate-1",
//         sourceHandle: "right",        // Plugs into Slider's right exit
//         targetHandle: "left",         // Plugs into Gate's left entrance
//         type: "edge_orthogonal",
//         animated: true
//     },
//     {
//         id: "e3",
//         source: "gate-1",
//         target: "db-1",
//         sourceHandle: "right",        // Plugs into Gate's right exit
//         targetHandle: "left-target",  // Plugs into TableNode's left entrance
//         type: "edge_kinetic",
//         animated: true,
//         label: "TRUE"
//     }
// ];

// export default function Home() {
//     const navigate = useNavigate();

//     return (
//         <div className="relative w-full min-h-screen overflow-hidden animate-[slideDown_0.4s_ease-out]">

//             <div className="absolute inset-0 bg-abstract-glow pointer-events-none -z-10" />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 lg:pt-48 pb-24 relative z-10 flex flex-col items-center text-center">

//                 {/* 1. Hero Section */}
//                 <div className="max-w-3xl mx-auto mb-16">

//                     <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
//                         Design Systems at <br className="hidden sm:block" />
//                         <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-electric to-blue-300">
//                             The Speed of Thought
//                         </span>
//                     </h1>

//                     <p className="text-lg sm:text-xl text-slate-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
//                         Translate complex architectural logic into interactive, math-driven visual canvases instantly using our AI orchestration engine.
//                     </p>

//                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                         <ElectricButton
//                             variant="primary"
//                             size="lg"
//                             onClick={() => navigate("/signin")}
//                             className="w-full sm:w-auto shadow-[0_0_30px_var(--color-electric-glow)]"
//                         >
//                             Start Building
//                         </ElectricButton>
//                         <ElectricButton
//                             variant="secondary"
//                             size="lg"
//                             onClick={() => {
//                                 document.getElementById("demo-section").scrollIntoView({ behavior: "smooth" });
//                             }}
//                             className="w-full sm:w-auto"
//                         >
//                             Watch Demo
//                         </ElectricButton>
//                     </div>
//                 </div>

//                 {/* 2. The Interactive AI Demo Section */}
//                 <div id="demo-section" className="w-full max-w-5xl mx-auto relative group mt-10">
//                     <div className="absolute -inset-4 bg-linear-to-tr from-electric/20 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 -z-10" />

//                     <div className="relative w-full h-[500px] glass-panel rounded-3xl overflow-hidden shadow-2xl gpu-layer">

//                         <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-moon-900/80 backdrop-blur-md border border-moon-800 rounded-full shadow-lg flex items-center justify-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
//                             <span className="text-[10px] leading-none font-bold text-slate-300 uppercase tracking-widest mt-[1px]">
//                                 Interactive Rendering
//                             </span>
//                         </div>

//                         <ReactFlowProvider>
//                             <ReactFlow
//                                 nodes={demoNodes}
//                                 edges={demoEdges}
//                                 nodeTypes={customNodeTypes}
//                                 edgeTypes={customEdgeTypes}
//                                 fitView
//                                 fitViewOptions={{ padding: 0.15 }} // Tighter padding for a more zoomed-in, impactful look
//                                 nodesDraggable={false} // Locked nodes
//                                 nodesConnectable={false} // Locked routing
//                                 elementsSelectable={true} // Allows sliding the slider
//                                 zoomOnScroll={false} // Prevents accidental mouse-wheel zooms
//                                 panOnDrag={false} // Prevents dragging the canvas background
//                                 preventScrolling={false} // Allows the user to scroll down the page naturally
//                                 className="touch-none"
//                             >
//                                 <Background color="#1e293b" gap={24} size={2} />
//                             </ReactFlow>
//                         </ReactFlowProvider>
//                     </div>

//                     <div className="mt-8 text-center text-sm font-bold tracking-widest text-slate-500 uppercase flex flex-col sm:flex-row items-center justify-center gap-3">
//                         <div className="flex items-center gap-2">
//                             <span className="text-electric">↑</span> 
//                             <span>Live React Flow rendering from AI JSON</span>
//                         </div>
//                         <span className="hidden sm:inline text-electric">|</span>
//                         <a href="/docs" className="text-electric hover:text-blue-300 transition-colors underline decoration-electric/30 underline-offset-4">
//                             View Data Flow Architecture
//                         </a>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }


import { useNavigate } from "react-router-dom";
import { ElectricButton } from "../components/index.js";
import InteractiveAiDemo from "../components/landing/InteractiveAiDemo.jsx";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen overflow-hidden animate-[slideDown_0.4s_ease-out]">

            <div className="absolute inset-0 bg-abstract-glow pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 lg:pt-48 pb-24 relative z-10 flex flex-col items-center text-center">

                {/* 1. Hero Section */}
                <div className="max-w-3xl mx-auto mb-16">

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
                        Design Systems at <br className="hidden sm:block" />
                        <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-electric to-blue-300">
                            The Speed of Thought
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                        Translate complex architectural logic into interactive, math-driven visual canvases instantly using our AI orchestration engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <ElectricButton
                            variant="primary"
                            size="lg"
                            onClick={() => navigate("/signin")}
                            className="w-full sm:w-auto shadow-[0_0_30px_var(--color-electric-glow)]"
                        >
                            Start Building
                        </ElectricButton>
                        <ElectricButton
                            variant="secondary"
                            size="lg"
                            onClick={() => {
                                document.getElementById("demo-section").scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full sm:w-auto"
                        >
                            Watch Demo
                        </ElectricButton>
                    </div>
                </div>

                {/* 2. The Interactive AI Demo Section */}
                <div id="demo-section" className="w-full max-w-5xl mx-auto relative group mt-10">

                    {/* Glowing background blur effect behind the engine */}
                    <div className="absolute -inset-4 bg-linear-to-tr from-electric/20 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 -z-10" />

                    {/* Isolated Engine Component */}
                    <InteractiveAiDemo />

                    <div className="mt-8 text-center text-sm font-bold tracking-widest text-slate-500 uppercase flex flex-col sm:flex-row items-center justify-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-electric">↑</span>
                            <span>Live React Flow rendering from AI JSON</span>
                        </div>
                        <span className="hidden sm:inline text-electric">|</span>
                        <a href="/docs" className="text-electric hover:text-blue-300 transition-colors underline decoration-electric/30 underline-offset-4">
                            View Data Flow Architecture
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}