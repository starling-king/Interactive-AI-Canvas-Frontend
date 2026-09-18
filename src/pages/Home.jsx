import { useNavigate } from "react-router-dom";
import { ElectricButton, InteractiveAiDemo } from "../components/index.js";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen overflow-hidden animate-[slideDown_0.4s_ease-out]">

            {/* 
        Abstract Glowing Orbs (Tied to SSOT)
        Provides background depth without hitting the CPU.
      */}
            <div className="absolute inset-0 bg-abstract-glow pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">

                {/* 1. Hero Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-panel border-electric/30">
                        <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_var(--color-electric-glow)]" />
                        <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                            Engine v1.0 is Live
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
                        Design Systems at <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-blue-300">
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
                                // Smooth scroll to the demo section
                                document.getElementById("demo-section").scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full sm:w-auto"
                        >
                            Watch Demo
                        </ElectricButton>
                    </div>
                </div>

                {/* 2. The Interactive AI Demo Section */}
                <div id="demo-section" className="w-full max-w-5xl mx-auto relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-electric/20 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 -z-10" />

                    {/* Mount the actual React Flow Engine here */}
                    <InteractiveAiDemo />

                    <div className="mt-8 text-center text-sm font-bold tracking-widest text-slate-500 uppercase">
                        <span className="text-electric">↑</span> Live React Flow rendering from AI-generated JSON
                    </div>
                </div>

            </div>
        </div>
    );
}