import { useState, useRef } from 'react';
import aiOrchestrationServices from '../Services/aiOrchestration.services.js';
import { useAiStore } from '../store/aiStore.js';
import { useCanvasStore } from '../store/canvasStore.js';
import { healAiPayload } from '../utils/aiValidator.js';

export const useAiActions = () => {
    const [error, setError] = useState(null);

    const { setActiveJob, setJobStatus, resetAiState } = useAiStore();

    // LATERAL THINKING: We need the canvas setter to inject the AI output automatically
    const setCanvasState = useCanvasStore((state) => state.setCanvasState);

    // Use a ref to hold the polling timer so we can clear it to prevent memory leaks
    const pollIntervalRef = useRef(null);

    const clearError = () => setError(null);

    // Matches POST /api/v1/ai/submit/:workspaceId
    const submitPrompt = async (workspaceId, inputType, rawInput, promptPayload) => {
        setError(null);
        setJobStatus('queued'); // Optimistic status update

        try {
            const response = await aiOrchestrationServices.submitAiPrompt({
                workspaceId,
                inputType,
                rawInput,
                promptPayload
            });

            if (response?.data?._id) {
                const jobId = response.data._id;
                setActiveJob(jobId);
                return jobId; // Return the ticket ID so the UI can start polling
            }
            return null;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit AI prompt.");
            setJobStatus('failed');
            return null;
        }
    };

    // Matches GET /api/v1/ai/poll/:orchestrationId
    const checkJobStatus = async (orchestrationId) => {
        try {
            const response = await aiOrchestrationServices.pollAiJobStatus({ orchestrationId });

            // The controller returns 202 if it's still working
            if (response.statusCode === 202) {
                setJobStatus(response.data.status); // 'queued' or 'processing'
                return response.data.status;
            }

            // The controller returns 200 if completed
            if (response.statusCode === 200) {
                setJobStatus('completed');

                // Extract the parsed JSON graph from the completed AI payload
                const generatedGraph = response.data.responsePayload;

                // Hydrate the React Flow Canvas instantly
                if (generatedGraph) {

                    const safeData = healAiPayload(generatedGraph);

                    setCanvasState(
                        safeData.nodesData || [],
                        safeData.edgesData || [],
                        generatedGraph.viewport || { x: 0, y: 0, zoom: 1 },
                        generatedGraph.globalMetrics || {}
                    );
                }
                return 'completed';
            }
        } catch (err) {
            setError(err.response?.data?.message || "AI processing failed.");
            setJobStatus('failed');
            return 'failed';
        }
    };

    // Orchestrates the interval polling mechanism
    const startPolling = (orchestrationId, intervalMs = 3000) => {
        // Clear any existing intervals to prevent overlapping requests
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

        pollIntervalRef.current = setInterval(async () => {
            
            const currentStatus = await checkJobStatus(orchestrationId);

            if (currentStatus === 'completed' || currentStatus === 'failed') {
                clearInterval(pollIntervalRef.current); // Stop polling when finished
                pollIntervalRef.current = null;
            }
        }, intervalMs);
    };

    const cleanupPolling = () => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
        }
        resetAiState();
        clearError();
    };

    return {
        submitPrompt,
        checkJobStatus,
        startPolling,
        cleanupPolling,
        error,
        clearError
    };
};