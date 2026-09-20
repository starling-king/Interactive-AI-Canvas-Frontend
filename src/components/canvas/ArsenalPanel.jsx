import React from 'react';
import GlassCard from '../ui/GlassCard.jsx';

export default function ArsenalPanel() {
    const onDragStart = (event, nodeType, defaultData) => {
        // Pack the node type and default data into the HTML drag payload
        event.dataTransfer.setData('application/reactflow/type', nodeType);
        event.dataTransfer.setData('application/reactflow/data', JSON.stringify(defaultData));
        event.dataTransfer.effectAllowed = 'move';
    };

    const tools = [
        { name: "Logic Box", type: "node_shape", data: { shapeType: "rectangle", label: "New Logic" }, icon: "▢" },
        { name: "Decision Gate", type: "node_interactive", data: { controlType: "gate", condition: "x > 10" }, icon: "◇" },
        { name: "Math Engine", type: "node_interactive", data: { controlType: "math", formulas: ["x = 0"], label: "Math" }, icon: "∑" },
        { name: "Slider Input", type: "node_interactive", data: { controlType: "slider", min: 0, max: 100, value: 50, label: "Input" }, icon: "⎚" },
        { name: "Sticky Note", type: "node_text", data: { text: "Add description..." }, icon: "📝" },
        { name: "Database", type: "node_table", data: { title: "New_DB", rows: [{ name: "id", type: "pk" }] }, icon: "🗄️" }
    ];

    return (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40">
            <GlassCard padding="sm" className="flex flex-col gap-3 bg-moon-900/90 border-moon-800 shadow-2xl">
                <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase text-center border-b border-moon-800 pb-2 mb-1">
                    Arsenal
                </div>

                {tools.map((tool, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center w-16 h-16 bg-moon-950 border border-moon-800 rounded-xl cursor-grab active:cursor-grabbing hover:border-electric hover:bg-electric/10 transition-colors group"
                        draggable
                        onDragStart={(e) => onDragStart(e, tool.type, tool.data)}
                        title={tool.name}
                    >
                        <span className="text-xl mb-1 text-slate-400 group-hover:text-electric transition-colors">
                            {tool.icon}
                        </span>
                        <span className="text-[8px] font-bold text-slate-500 tracking-wider text-center leading-tight group-hover:text-slate-300">
                            {tool.name}
                        </span>
                    </div>
                ))}
            </GlassCard>
        </div>
    );
}