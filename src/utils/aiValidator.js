// Configuration Dictionary - Easy to edit rules without touching logic
const CONFIG = {
    VALID_NODES: ['node_shape', 'node_table', 'node_icon', 'node_text', 'node_container', 'node_interactive'],
    VALID_EDGES: ['edge_orthogonal', 'edge_straight', 'edge_relational', 'edge_kinetic'],
    DEFAULT_WIDTH: 150,
    DEFAULT_HEIGHT: 80
};

export const healAiPayload = (rawPayload) => {
    try {
        // 1. Normalize structural typos (Healing "nodes" to "nodesData")
        let nodes = rawPayload?.nodesData || rawPayload?.nodes || [];
        let edges = rawPayload?.edgesData || rawPayload?.edges || [];

        if (!Array.isArray(nodes)) nodes = [];
        if (!Array.isArray(edges)) edges = [];

        // 2. Sanitize & Enforce Nodes
        const sanitizedNodes = nodes.reduce((acc, node) => {
            if (!node.id) return acc;

            const type = CONFIG.VALID_NODES.includes(node.type) ? node.type : 'node_shape';
            const data = node.data || {};

            // The Math Shield: Catch arrays and normalize to single string
            if (type === 'node_interactive' && data.controlType === 'math') {
                // If AI hallucinates the old array format, extract the first item
                if (Array.isArray(data.formulas)) data.formula = data.formulas[0] || "";
                
                // If AI hallucinates an array syntax in the math, disarm it
                if (data.formula && typeof data.formula === 'string') {
                    if (data.formula.includes('[') || data.formula.includes(']')) {
                        data.formula = "error = 0 // Arrays blocked by Validator";
                    }
                }
            }

            acc.push({
                ...node,
                id: String(node.id),
                type,
                position: {
                    x: Number(node.position?.x) || 0,
                    y: Number(node.position?.y) || 0
                },
                data: {
                    ...data,
                    width: Number(data.width) || CONFIG.DEFAULT_WIDTH,
                    height: Number(data.height) || CONFIG.DEFAULT_HEIGHT
                }
            });

            return acc;
        }, []);

        // 3. Sanitize Edges (Drop edges connecting to non-existent nodes)
        const validNodeIds = new Set(sanitizedNodes.map(n => n.id));

        const sanitizedEdges = edges.reduce((acc, edge) => {
            if (!edge.id || !edge.source || !edge.target) return acc;
            if (!validNodeIds.has(edge.source) || !validNodeIds.has(edge.target)) return acc;

            const type = CONFIG.VALID_EDGES.includes(edge.type) ? edge.type : 'edge_orthogonal';

            acc.push({
                ...edge,
                id: String(edge.id),
                source: String(edge.source),
                target: String(edge.target),
                type,
                animated: type === 'edge_kinetic' ? true : !!edge.animated,
                sourceHandle: edge.sourceHandle || 'bottom',
                targetHandle: edge.targetHandle || 'top'
            });

            return acc;
        }, []);

        return { nodesData: sanitizedNodes, edgesData: sanitizedEdges };

    } catch (error) {
        console.error("[AI Validator] Payload healing failed:", error);
        return { nodesData: [], edgesData: [] };
    }
};