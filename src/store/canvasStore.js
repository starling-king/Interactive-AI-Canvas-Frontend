import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'; // Adjust import based on your React Flow version

export const useCanvasStore = create((set, get) => ({
    // --- 1. GLOBAL STATE (Matches Zod Schema) ---
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    globalMetrics: {},
    isFetching: false, // Used for the initial load of the canvas

    // --- 2. MICRO-HISTORY (UNDO/REDO STACK) ---

    past: [],
    future: [],

    takeSnapshot: () => {
        const { nodes, edges, past } = get();
        // Cap the memory at 50 steps so the browser doesn't crash from memory bloat
        const newPast = [...past, { nodes, edges }].slice(-50);
        set({ past: newPast, future: [] }); // Clear future on new action
    },

    undo: () => {
        const { past, future, nodes, edges } = get();
        if (past.length === 0) return;

        const previousState = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        set({
            past: newPast,
            future: [{ nodes, edges }, ...future],
            nodes: previousState.nodes,
            edges: previousState.edges
        });
    },

    redo: () => {
        const { past, future, nodes, edges } = get();
        if (future.length === 0) return;

        const nextState = future[0];
        const newFuture = future.slice(1);

        set({
            past: [...past, { nodes, edges }],
            future: newFuture,
            nodes: nextState.nodes,
            edges: nextState.edges
        });
    },

    // --- 2. NETWORK SETTERS ---
    setFetching: (status) => set({ isFetching: status }),

    // Injects data from the database into the canvas
    setCanvasState: (nodesData, edgesData, viewport, globalMetrics) => set({
        nodes: nodesData || [],
        edges: edgesData || [],
        viewport: viewport || { x: 0, y: 0, zoom: 1 },
        globalMetrics: globalMetrics || {}
    }),

    // --- 3. KINETIC SETTERS (React Flow Requirements) ---

    addNode: (node) => set({ nodes: [...get().nodes, node] }),

    deleteSelectedElements: () => set({
        nodes: get().nodes.filter((node) => !node.selected),
        edges: get().edges.filter((edge) => !edge.selected),
    }),

    onNodesChange: (changes) => set({
        nodes: applyNodeChanges(changes, get().nodes),
    }),

    onEdgesChange: (changes) => set({
        edges: applyEdgeChanges(changes, get().edges),
    }),

    onConnect: (connection) => set({
        edges: addEdge(connection, get().edges),
    }),

    setViewport: (viewport) => set({ viewport }),

    updateGlobalMetrics: (metrics) => set({ globalMetrics: metrics }),
}));