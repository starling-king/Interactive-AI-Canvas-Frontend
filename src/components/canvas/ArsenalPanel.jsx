import React, { useState, useRef } from 'react';
import GlassCard from '../ui/GlassCard.jsx';

// 1. THE REGISTRIES (Single Source of Truth)
// We import directly from the node modules so our UI automatically adapts
// whenever a new shape or icon vector is added to the system.
import { IconRegistry } from '../nodes/IconNode.jsx';
import { CSS_SHAPES } from '../nodes/ShapeNode.jsx';

export default function ArsenalPanel({ onAddNode }) {
    // 2. ACTIVE CATEGORY & HOVER BRIDGE STATE
    const [activeCategory, setActiveCategory] = useState(null);
    const timeoutRef = useRef(null);

    // Biological buffer: Gives the human cursor 150ms to cross the empty air gap
    // between the main dock and the flyout menu without the panel prematurely snapping shut.
    const handleMouseEnter = (category) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveCategory(category);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 150);
    };

    // 3. DEFENSIVE DRAG-AND-DROP PROTOCOL
    // Broadcasts both legacy and standard MIME types so the canvas drop handler
    // always receives valid payloads regardless of version shifts.
    const onDragStart = (event, nodeType, defaultData) => {
        // Legacy keys
        event.dataTransfer.setData('application/reactflow/type', nodeType);
        event.dataTransfer.setData('application/reactflow/data', JSON.stringify(defaultData));
        // Standard keys
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/json', JSON.stringify(defaultData));
        event.dataTransfer.effectAllowed = 'move';
    };

    // 4. DYNAMIC GENERATORS (Zero Manual Maintenance)
    // Automatically loops over every CSS shape in your dictionary
    const shapeTools = Object.keys(CSS_SHAPES).map(shapeKey => ({
        name: shapeKey.charAt(0).toUpperCase() + shapeKey.slice(1),
        type: "node_shape",
        data: { shapeType: shapeKey, label: shapeKey, colorTheme: 'slate' }
    }));

    // Automatically loops over every vector in your Icon registry (excluding 'default')
    const iconTools = Object.keys(IconRegistry)
        .filter(iconKey => iconKey !== 'default')
        .map(iconKey => ({
            name: iconKey.charAt(0).toUpperCase() + iconKey.slice(1),
            type: "node_icon",
            data: { iconType: iconKey, label: iconKey }
        }));

    // 5. MASTER CATEGORY MANIFEST
    const toolCategories = [
        {
            category: "Core",
            icon: "❖",
            items: [
                {
                    name: "Database",
                    type: "node_table",
                    data: { title: "New_Table", rows: [{ name: "id", type: "pk" }] }
                },
                {
                    name: "Container",
                    type: "node_container",
                    data: { label: "Subsystem Zone" }
                },
                {
                    name: "Note",
                    type: "node_text",
                    data: { text: "System Note..." }
                }
            ]
        },
        {
            category: "Shapes",
            icon: "⬡",
            items: shapeTools
        },
        {
            category: "Icons",
            icon: "⌘",
            items: iconTools
        },
        {
            category: "Controls",
            icon: "⎚",
            items: [
                {
                    name: "Toggle",
                    type: "node_interactive",
                    data: { controlType: "toggle", state: false, label: "Toggle Switch" }
                },
                {
                    name: "Slider",
                    type: "node_interactive",
                    data: { controlType: "slider", min: 0, max: 100, value: 50, label: "Input Throttle" }
                },
                {
                    name: "Gate",
                    type: "node_interactive",
                    data: { controlType: "gate", condition: "x > 10", passed: true, label: "Logic Gate" }
                },
                {
                    name: "Math",
                    type: "node_interactive",
                    data: { controlType: "math", formulas: ["x = 0"], results: { out: 0 }, label: "Compute Unit" }
                }
            ]
        },
        {
            category: "Edges",
            icon: "↘",
            items: [
                { name: "Kinetic", type: "edge_type", data: { edgeType: "edge_kinetic", label: "Kinetic Flow" } },
                { name: "Orthogonal", type: "edge_type", data: { edgeType: "edge_orthogonal", label: "Orthogonal Route" } },
                { name: "Relational", type: "edge_type", data: { edgeType: "edge_relational", label: "Relational Key" } },
                { name: "Straight", type: "edge_type", data: { edgeType: "edge_straight", label: "Straight Line" } }
            ]
        }
    ];

    // 6. ADAPTIVE VISUAL ENGINE
    // Renders the exact visual representation of the tool matching the canvas theme
    const renderToolVisual = (tool) => {
        // SVG Icons
        if (tool.type === 'node_icon' && IconRegistry[tool.data.iconType]) {
            const Icon = IconRegistry[tool.data.iconType];
            return <Icon className="w-5 h-5 text-slate-400 group-hover/tool:text-electric transition-colors" />;
        }

        // Pure CSS Geometries
        if (tool.type === 'node_shape' && CSS_SHAPES[tool.data.shapeType]) {
            const geometry = CSS_SHAPES[tool.data.shapeType];
            return (
                <div
                    style={{ clipPath: geometry.clipPath, borderRadius: geometry.borderRadius }}
                    className="w-5 h-5 bg-slate-400 group-hover/tool:bg-electric transition-colors shadow-sm"
                />
            );
        }

        // Database Table Mini-Visual
        if (tool.type === 'node_table') {
            const DbIcon = IconRegistry.database;
            return <DbIcon className="w-5 h-5 text-blue-400 group-hover/tool:text-electric transition-colors" />;
        }

        // Subsystem Container Mini-Visual
        if (tool.type === 'node_container') {
            return <div className="w-5 h-5 border-2 border-dashed border-slate-400 group-hover/tool:border-electric rounded transition-colors" />;
        }

        // Text Note Mini-Visual
        if (tool.type === 'node_text') {
            return <span className="text-base font-serif font-bold text-slate-400 group-hover/tool:text-electric">T</span>;
        }

        // Interactive Controls (Toggle, Slider, Gate, Math)
        if (tool.type === 'node_interactive') {
            if (tool.data.controlType === 'toggle') {
                return (
                    <div className="w-6 h-3 bg-slate-700 rounded-full flex items-center p-0.5 border border-slate-600 group-hover/tool:border-electric">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full ml-auto" />
                    </div>
                );
            }
            if (tool.data.controlType === 'slider') {
                return (
                    <div className="w-6 flex flex-col gap-0.5 items-center">
                        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-blue-400 group-hover/tool:bg-electric" />
                        </div>
                    </div>
                );
            }
            if (tool.data.controlType === 'gate') {
                return <span className="text-sm font-bold font-mono text-emerald-400 group-hover/tool:text-electric">◇</span>;
            }
            if (tool.data.controlType === 'math') {
                return <span className="text-sm font-bold font-mono text-blue-400 group-hover/tool:text-electric">∑</span>;
            }
        }

        // Edge Wires Mini-Visual
        if (tool.type === 'edge_type') {
            return (
                <div className="w-6 h-0.5 bg-slate-400 group-hover/tool:bg-electric rotate-45 transition-colors relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-slate-400 group-hover/tool:border-electric rotate-45" />
                </div>
            );
        }

        return <span className="text-xs font-bold text-slate-400">?</span>;
    };

    const activeGroup = toolCategories.find(g => g.category === activeCategory);

    return (
        // POINTER-EVENTS-NONE on the root allows clicks to pass through empty canvas areas
        <aside className="absolute left-4 top-24 z-50 flex gap-3 pointer-events-none select-none">
            {/* MAIN DOCK */}
            <GlassCard
                padding="none"
                className="w-[84px] h-max flex flex-col bg-moon-900/90 border-moon-800 shadow-2xl py-3 pointer-events-auto shrink-0"
            >
                <div className="text-[9px] font-bold tracking-widest text-slate-500 uppercase text-center border-b border-moon-800 pb-2.5 mb-3 mx-2">
                    Arsenal
                </div>

                <div className="flex flex-col gap-2.5 items-center">
                    {toolCategories.map((group, gIdx) => {
                        const isActive = activeCategory === group.category;
                        return (
                            <div
                                key={gIdx}
                                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl cursor-pointer transition-all duration-150 ${isActive
                                        ? 'bg-electric/15 border-electric border shadow-[0_0_12px_var(--color-electric-glow)]'
                                        : 'bg-moon-950/80 border border-moon-800 hover:border-electric/50 hover:bg-electric/10'
                                    }`}
                                onMouseEnter={() => handleMouseEnter(group.category)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setActiveCategory(isActive ? null : group.category)}
                            >
                                <span className={`text-lg mb-0.5 transition-colors ${isActive ? 'text-electric' : 'text-slate-400'}`}>
                                    {group.icon}
                                </span>
                                <span className={`text-[8px] font-bold tracking-wider text-center uppercase ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                                    {group.category}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

            {/* FLYOUT SUB-MENU */}
            {activeGroup && (
                <div
                    className="pointer-events-auto h-max animate-in fade-in slide-in-from-left-2 duration-150"
                    onMouseEnter={() => handleMouseEnter(activeCategory)}
                    onMouseLeave={handleMouseLeave}
                >
                    <GlassCard
                        padding="sm"
                        className="bg-moon-900/95 border-moon-800 shadow-2xl w-[260px] max-h-[480px] flex flex-col"
                    >
                        {/* Sub-Header */}
                        <div className="flex items-center justify-between border-b border-moon-800 pb-2 mb-2.5 shrink-0">
                            <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                                {activeGroup.category} Library
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 bg-moon-950 px-1.5 py-0.5 rounded border border-moon-800">
                                {activeGroup.items.length} units
                            </span>
                        </div>

                        {/* Scrollable Tool Grid */}
                        <div className="grid grid-cols-3 gap-2 overflow-y-auto pr-1 max-h-[400px] custom-scrollbar">
                            {activeGroup.items.map((tool, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center justify-center p-2 h-16 bg-moon-950/70 border border-moon-800 rounded-lg cursor-grab active:cursor-grabbing hover:border-electric hover:bg-electric/10 transition-colors group/tool"
                                    draggable
                                    onDragStart={(e) => onDragStart(e, tool.type, tool.data)}
                                    onClick={() => {
                                        if (onAddNode) onAddNode(tool.type, tool.data);
                                    }}
                                    title={`Drag or click to spawn ${tool.name}`}
                                >
                                    <div className="h-6 flex items-center justify-center mb-1 pointer-events-none">
                                        {renderToolVisual(tool)}
                                    </div>
                                    <span className="text-[8px] font-bold text-slate-400 tracking-wider text-center leading-tight truncate w-full group-hover/tool:text-slate-200 pointer-events-none">
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}
        </aside>
    );
}