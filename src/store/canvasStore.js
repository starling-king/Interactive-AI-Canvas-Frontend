import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'; // Adjust import based on your React Flow version

export const useCanvasStore = create((set, get) => ({
    // --- 1. GLOBAL STATE (Matches Zod Schema) ---
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    globalMetrics: {},
    isFetching: false, // Used for the initial load of the canvas

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