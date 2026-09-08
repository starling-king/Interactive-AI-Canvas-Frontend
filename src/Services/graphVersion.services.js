import apiClient from "../config/apiClient";

class GraphVersionServices {
    // Matches GET /api/v1/versions/workspace/:workspaceId
    async getWorkspaceVersionHistory({ workspaceId }) {
        try {
            const response = await apiClient.get(`/versions/workspace/${workspaceId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Matches POST /api/v1/versions/workspace/:workspaceId
    async createVersionSnapshot({ workspaceId, changeSummary }) {
        try {
            const payload = {
                changeSummary,
            };
            const response = await apiClient.post(
                `/versions/workspace/${workspaceId}`,
                payload
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Matches GET /api/v1/versions/preview/:versionId
    async getSingleVersionPreview({ versionId }) {
        try {
            const response = await apiClient.get(`/versions/preview/${versionId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Matches POST /api/v1/versions/restore/:versionId
    async restoreVersion({ versionId }) {
        try {
            const response = await apiClient.post(`/versions/restore/${versionId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

const graphVersionServices = new GraphVersionServices();

export default graphVersionServices;