import apiClient from "../config/apiClient";

class WorkspaceServices {
  async createWorkspace({ title, description, diagramType, isPublished }) {
    try {
      // Payload precisely matches backend req.body
      const payload = {
        title,
        description,
        diagramType,
        isPublished,
      };
      const response = await apiClient.post("/workspaces/createWorkspace", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdminWorkspaces() {
    try {
      // Aligned with backend controller name
      const response = await apiClient.get("/workspaces/getAllAdminWorkspaces");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPublicWorkspaceBySlug({ slug }) {
    try {
      // Matches the backend params expectation for the public viewer
      const response = await apiClient.get(`/workspaces/public/${slug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateWorkspace({ id, ...updatedData }) {
    try {
      const response = await apiClient.patch(
        `/workspaces/updateWorkspace/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteWorkspace({ id }) {
    try {
      const response = await apiClient.delete(`/workspaces/deleteWorkspace/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const workspaceServices = new WorkspaceServices();
export default workspaceServices;