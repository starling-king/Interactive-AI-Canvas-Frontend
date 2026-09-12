import { useState } from 'react';
import graphVersionServices from '../Services/graphVersion.services.js';
import { useVersionStore } from '../store/versionStore.js';
import { useCanvasStore } from '../store/canvasStore.js';

export const useVersionActions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { setFetching, setHistory, addVersion, setPreview } = useVersionStore();

    // LATERAL THINKING: Pull the setter from the canvas store so we can hydrate it on restore
    const setCanvasState = useCanvasStore((state) => state.setCanvasState);

    const clearError = () => setError(null);

    // Matches GET /api/v1/versions/workspace/:workspaceId
    const fetchHistory = async (workspaceId) => {
        setFetching(true);
        setError(null);
        try {
            const response = await graphVersionServices.getWorkspaceVersionHistory({ workspaceId });
            setHistory(response?.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load history.");
        } finally {
            setFetching(false);
        }
    };

    // Matches POST /api/v1/versions/workspace/:workspaceId
    const createVersion = async (workspaceId, changeSummary) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await graphVersionServices.createVersionSnapshot({ workspaceId, changeSummary });
            if (response?.data) {
                addVersion(response.data); // Optimistically show the new version in the sidebar
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save snapshot.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Matches GET /api/v1/versions/preview/:versionId
    const fetchPreview = async (versionId) => {
        setIsLoading(true);
        setError(null);
        setPreview(null);
        try {
            const response = await graphVersionServices.getSingleVersionPreview({ versionId });
            if (response?.data) {
                setPreview(response.data); // Loads the heavy stateSnapshot into memory
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load preview.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Matches POST /api/v1/versions/restore/:versionId
    const restoreVersion = async (versionId, workspaceId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await graphVersionServices.restoreVersion({ versionId });
            if (response?.data) {
                // 1. Instantly update the React Flow canvas with the restored data
                const { nodesData, edgesData, viewport, globalMetrics } = response.data;
                setCanvasState(nodesData, edgesData, viewport, globalMetrics);

                // 2. Refresh the history to grab the auto-generated "Restored back to..." log
                await fetchHistory(workspaceId);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to restore version.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fetchHistory,
        createVersion,
        fetchPreview,
        restoreVersion,
        isLoading,
        error,
        clearError
    };
};