import apiClient from "../config/apiClient";

class AiOrchestrationServices {
    // Matches POST /api/v1/ai/submit/:workspaceId
    async submitAiPrompt({ workspaceId, inputType, rawInput, promptPayload }) {
        try {
            const payload = {
                inputType,
                rawInput,
                promptPayload,
            };

            const response = await apiClient.post(`/ai/submit/${workspaceId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Matches GET /api/v1/ai/poll/:orchestrationId
    async pollAiJobStatus({ orchestrationId }) {
        try {
            const response = await apiClient.get(`/ai/poll/${orchestrationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

const aiOrchestrationServices = new AiOrchestrationServices();

export default aiOrchestrationServices;