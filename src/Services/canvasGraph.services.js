import apiClient from "../config/apiClient";

class CanvasGraphServices {
    // Matches POST /api/v1/canvas/:workspaceId
    async saveCanvasGraph({ workspaceId, nodesData, edgesData, viewport, globalMetrics }) {
        try {
            const payload = {
                nodesData,
                edgesData,
                viewport,
                globalMetrics,
            };

            const response = await apiClient.post(`/canvas/${workspaceId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Matches GET /api/v1/canvas/:workspaceId
    async getCanvasGraph({ workspaceId }) {
        try {
            const response = await apiClient.get(`/canvas/${workspaceId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

const canvasGraphServices = new CanvasGraphServices();

export default canvasGraphServices;