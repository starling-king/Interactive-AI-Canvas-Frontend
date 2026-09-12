import { useState } from 'react';
import canvasGraphServices from '../Services/canvasGraph.services.js';
import { useCanvasStore } from '../store/canvasStore.js';

export const useCanvasActions = () => {
    // Local, garbage-collected network states
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const { setFetching, setCanvasState } = useCanvasStore();

    const clearError = () => setError(null);

    // Matches GET /api/v1/canvas/:workspaceId
    const fetchCanvas = async (workspaceId) => {
        setFetching(true);
        setError(null);
        try {
            const response = await canvasGraphServices.getCanvasGraph({ workspaceId });

            if (response?.data) {
                // The controller uses aggregation and returns `canvasData` inside the workspace result
                const canvasData = response.data.canvasData || {};

                setCanvasState(
                    canvasData.nodesData,
                    canvasData.edgesData,
                    canvasData.viewport,
                    canvasData.globalMetrics
                );
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load the canvas graph.");
            return false;
        } finally {
            setFetching(false);
        }
    };

    // Matches POST /api/v1/canvas/:workspaceId
    const saveCanvas = async (workspaceId) => {
        setIsSaving(true);
        setError(null);

        // Grab the live state directly from the global brain
        const { nodes, edges, viewport, globalMetrics } = useCanvasStore.getState();

        try {
            const response = await canvasGraphServices.saveCanvasGraph({
                workspaceId,
                nodesData: nodes,
                edgesData: edges,
                viewport,
                globalMetrics
            });

            return response?.data ? true : false;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save the canvas state.");
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        fetchCanvas,
        saveCanvas,
        isSaving,
        error,
        clearError
    };
};