import { useNavigate } from "react-router-dom";
import { ReactFlow, Background, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ElectricButton, customNodeTypes, customEdgeTypes } from "../components/index.js";

// --- THE DEMO GRAPH DATA ---
// We explicitly use the node types defined in your index.js SSOT
const demoNodes = [
    {
        id: "user",
        type: "node_icon",
        position: { x: 50, y: 150 },
        data: { iconType: "default", label: "User Input" }
    },
    {
        id: "math",
        type: "node_interactive",
        position: { x: 220, y: 130 },
        // This makes the node interactive. The user can slide the value!
        data: { controlType: "slider", min: 100, max: 10000, value: 5500, label: "Subtotal", metricKey: "demo_subtotal" }
    },
    {
        id: "gate",
        type: "node_interactive",
        position: { x: 480, y: 140 },
        data: { controlType: "gate", condition: "demo_subtotal > 5000", label: "High Value Check" }
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

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen overflow-hidden animate-[slideDown_0.4s_ease-out]">

            <div className="absolute inset-0 bg-abstract-glow pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">

                {/* 1. Hero Section */}
                <div className="max-w-3xl mx-auto mb-16">

                    {/* FIX: Centered the Live Engine Pill elements using items-center and leading-none */}
                    {/* <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-8 rounded-full glass-panel border-electric/30">
                        <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
                        <span className="text-[11px] leading-none font-bold tracking-widest text-slate-300 uppercase mt-[1px]">
                            Engine v1.0 is Live
                        </span>
                    </div> */}

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
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
                            onClick={() => navigate("/login")}
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
                    <div className="absolute -inset-4 bg-linear-to-tr from-electric/20 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 -z-10" />

            
                    <div className="relative w-full h-[500px] sm:h-[600px] glass-panel rounded-3xl overflow-hidden shadow-2xl gpu-layer">

                        {/* Inner Live Status Badge */}
                        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-moon-900/80 backdrop-blur-md border border-moon-800 rounded-full shadow-lg flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
                            <span className="text-[10px] leading-none font-bold text-slate-300 uppercase tracking-widest mt-[1px]">
                                Interactive Rendering
                            </span>
                        </div>

                        <ReactFlowProvider>
                            <ReactFlow
                                nodes={demoNodes}
                                edges={demoEdges}
                                nodeTypes={customNodeTypes}
                                edgeTypes={customEdgeTypes}
                                fitView
                                fitViewOptions={{ padding: 0.2 }}
                                // Allow interaction so they can slide the slider, but prevent dragging nodes out of place
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
                        </ReactFlowProvider>
                    </div>

                    <div className="mt-8 text-center text-sm font-bold tracking-widest text-slate-500 uppercase">
                        <span className="text-electric">↑</span> Live React Flow rendering from AI-generated JSON
                    </div>
                </div>

            </div>
        </div>
    );
}