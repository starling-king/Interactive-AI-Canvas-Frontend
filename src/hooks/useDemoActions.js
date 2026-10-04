// // import { useDemoStore } from '../store/demoStore.js';

// // export const useDemoActions = () => {
// //     const { nodes, edges, setDemoState } = useDemoStore();

// //     const processDemoCascade = (metricKey, newValue) => {
// //         // 1. Deep clone to prevent direct state mutation (Zustand best practice)
// //         const nextNodes = JSON.parse(JSON.stringify(nodes));
// //         const nextEdges = JSON.parse(JSON.stringify(edges));

// //         // 2. Identify the core components
// //         const sliderNode = nextNodes.find(n => n.id === 'slider-1');
// //         const gateNode = nextNodes.find(n => n.id === 'gate-1');
// //         const dbNode = nextNodes.find(n => n.id === 'db-1');
// //         const gateEdge = nextEdges.find(e => e.id === 'e3');

// //         if (!sliderNode || !gateNode || !gateEdge || !dbNode) return;

// //         // 3. Update the visual value of the slider
// //         sliderNode.data.value = newValue;

// //         // 4. AI Engine Math Evaluation (Assuming strict 'demo_subtotal > 5000' for demo)
// //         const isApproved = newValue > 5000;
// //         gateNode.data.passed = isApproved;

// //         // 5. Visual Edge Feedback (Reactive Wiring)
// //         gateEdge.label = isApproved ? 'TRUE' : 'FALSE';
// //         gateEdge.animated = isApproved; // Stops data flow animation if rejected
// //         gateEdge.style = isApproved
// //             ? { stroke: '#00E5FF', strokeWidth: 2.5, filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))' } // Electric Blue
// //             : { stroke: '#F43F5E', strokeWidth: 2.5, filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.8))', strokeDasharray: '5,5' }; // Rose / Broken Line

// //         // 6. Database JSON Injection
// //         dbNode.data.dbStatus = isApproved ? 'SUCCESS' : 'REJECTED';
// //         dbNode.data.activeJson = isApproved
// //             ? { order_id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`, total: newValue, status: 'PROCESSED' }
// //             : { error: 'Validation Failed', reason: 'Subtotal too low', total: newValue };

// //         // 7. Commit the cascade to the Zustand store
// //         setDemoState(nextNodes, nextEdges);
// //     };

// //     return { processDemoCascade };
// // };

// import { useDemoStore } from '../store/demoStore.js';
// import { MathEngine } from '../utils/mathEngine.js';

// export const useDemoActions = () => {
//     const { nodes, edges, setDemoState } = useDemoStore();

//     const processDemoCascade = (metricKey, newValue) => {
//         // Deep clone to prevent direct React state mutation
//         const nextNodes = JSON.parse(JSON.stringify(nodes));
//         const nextEdges = JSON.parse(JSON.stringify(edges));

//         const sliderNode = nextNodes.find(n => n.id === 'slider-1');
//         const gateNode = nextNodes.find(n => n.id === 'gate-1');
//         const dbNode = nextNodes.find(n => n.id === 'db-1');
//         const gateEdge = nextEdges.find(e => e.id === 'e3');

//         if (!sliderNode || !gateNode || !gateEdge || !dbNode) return;

//         // 1. Update Slider Data
//         sliderNode.data.value = newValue;

//         // 2. AI Engine Math Evaluation
//         // Dynamically evaluates "demo_subtotal > 5000" using your MathEngine AST parser
//         const activeScope = { [metricKey]: newValue };
//         const isApproved = MathEngine.evaluateCondition(gateNode.data.condition, activeScope);

//         gateNode.data.passed = isApproved;

//         // 3. Visual Edge Feedback (Reactive Wiring)
//         gateEdge.label = isApproved ? 'TRUE' : 'FALSE';
//         gateEdge.animated = isApproved;
//         gateEdge.style = isApproved
//             ? { stroke: '#00E5FF', strokeWidth: 2.5, filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))' }
//             : { stroke: '#F43F5E', strokeWidth: 2.5, filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.8))', strokeDasharray: '5,5' };

//         // 4. Database JSON Injection
//         dbNode.data.dbStatus = isApproved ? 'SUCCESS' : 'REJECTED';
//         dbNode.data.activeJson = isApproved
//             ? { order_id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`, total: newValue, status: 'PROCESSED' }
//             : { error: 'Validation Failed', reason: 'Subtotal too low', total: newValue };

//         // Commit the cascade to the Zustand store
//         setDemoState(nextNodes, nextEdges);
//     };

//     return { processDemoCascade };
// };

import { useDemoStore } from '../store/demoStore.js';
import { MathEngine } from '../utils/mathEngine.js';

export const useDemoActions = () => {
    const { nodes, edges, setDemoState } = useDemoStore();

    const processDemoCascade = (metricKey, newValue) => {
        // 1. Deep clone to prevent direct state mutation (Zustand best practice)
        const nextNodes = JSON.parse(JSON.stringify(nodes));
        const nextEdges = JSON.parse(JSON.stringify(edges));

        // 2. Identify the core components of the locked demo graph
        const sliderNode = nextNodes.find(n => n.id === 'slider-1');
        const gateNode = nextNodes.find(n => n.id === 'gate-1');
        const dbNode = nextNodes.find(n => n.id === 'db-1');
        const gateEdge = nextEdges.find(e => e.id === 'e3');

        if (!sliderNode || !gateNode || !gateEdge || !dbNode) return;

        // 3. Update the visual value of the slider
        sliderNode.data.value = newValue;

        // 4. Biological Brain Integration (Using your actual MathEngine)
        // Dynamically build the scope payload expected by the engine
        const scope = { [metricKey]: newValue };

        // Evaluate the exact string condition (e.g., "demo_subtotal > 5000")
        const isApproved = MathEngine.evaluateCondition(gateNode.data.condition, scope);
        gateNode.data.passed = isApproved;

        // 5. Visual Edge Feedback (Reactive Wiring)
        gateEdge.label = isApproved ? 'TRUE' : 'FALSE';
        gateEdge.animated = isApproved; // Stops data flow animation if rejected
        gateEdge.style = isApproved
            ? { stroke: '#00E5FF', strokeWidth: 2.5, filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))' } // Electric Blue
            : { stroke: '#F43F5E', strokeWidth: 2.5, filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.8))', strokeDasharray: '5,5' }; // Rose / Broken Line

        // 6. Database JSON Injection Simulation
        dbNode.data.dbStatus = isApproved ? 'SUCCESS' : 'REJECTED';
        dbNode.data.activeJson = isApproved
            ? { order_id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`, total: newValue, status: 'PROCESSED' }
            : { error: 'Validation Failed', reason: 'Subtotal too low', total: newValue };

        // 7. Commit the newly calculated state to the Zustand store
        setDemoState(nextNodes, nextEdges);
    };

    return { processDemoCascade };
};