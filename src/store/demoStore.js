import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import dagre from 'dagre';

// 1. RAW DATA (Preserving your exact original nodes and database structure)
// We add 'measured' dimensions so Dagre knows exactly where the center of each specific component is.
const rawNodes = [
    { id: "user", type: "node_icon", data: { iconType: "default", label: "USER INPUT", animationStyle: "pulse" }, measured: { width: 240, height: 140 } },
    { id: "slider-1", type: "node_interactive", data: { controlType: "slider", label: "Subtotal", metricKey: "demo_subtotal", value: 12758.18, min: 100, max: 15000, isGlobal: false }, measured: { width: 260, height: 130 } },
    { id: "gate-1", type: "node_interactive", data: { controlType: "gate", label: "High Value Check", condition: "demo_subtotal > 5000", isGlobal: false, passed: true }, measured: { width: 260, height: 130 } },
    { id: "db-1", type: "node_table", data: { title: "Orders_DB", dbStatus: "IDLE", activeJson: null, rows: [{ name: "order_id", type: "string pk" }, { name: "total", type: "integer" }] }, measured: { width: 260, height: 150 } }
];

const rawEdges = [
    { id: "e1", source: "user", target: "slider-1", sourceHandle: "right-source", targetHandle: "left-target", type: "edge_orthogonal", animated: true },
    { id: "e2", source: "slider-1", target: "gate-1", sourceHandle: "right-source", targetHandle: "left-target", type: "edge_orthogonal", animated: true },
    { id: "e3", source: "gate-1", target: "db-1", sourceHandle: "right-source", targetHandle: "left-target", type: "edge_kinetic", animated: true, label: "TRUE" }
];

// 2. THE DAGRE ALGORITHM ENGINE
const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // rankdir = Left to Right. 
    // ranksep = 150px of equal horizontal spacing between every node so wires/labels are clearly visible.
    // nodesep = 50px of vertical spacing.
    dagreGraph.setGraph({ rankdir: direction, ranksep: 150, nodesep: 50 });

    // Feed nodes to Dagre
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: node.measured.width, height: node.measured.height });
    });

    // Feed connections to Dagre
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // Execute mathematical layout
    dagre.layout(dagreGraph);

    // Map calculated centers back to React Flow's top-left coordinates, removing the temporary 'measured' key
    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const { measured, ...restNode } = node; // Clean up the object before passing to React Flow

        return {
            ...restNode,
            position: {
                x: nodeWithPosition.x - measured.width / 2,
                y: nodeWithPosition.y - measured.height / 2,
            },
        };
    });

    return { layoutedNodes, layoutedEdges: edges };
};

// Pre-calculate the flawless layout before the Zustand store initializes
const { layoutedNodes: initialNodes, layoutedEdges: initialEdges } = getLayoutedElements(rawNodes, rawEdges);

// 3. THE ZUSTAND STORE
export const useDemoStore = create((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,

    onNodesChange: (changes) => set({
        nodes: applyNodeChanges(changes, get().nodes),
    }),
    onEdgesChange: (changes) => set({
        edges: applyEdgeChanges(changes, get().edges),
    }),

    setDemoState: (newNodes, newEdges) => set({ nodes: newNodes, edges: newEdges }),

    resetDemoStore: () => set({ nodes: initialNodes, edges: initialEdges })
}));