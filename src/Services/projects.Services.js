import apiClient from "../config/apiClient";

class ProjectServices {
  async createProject({
    title,
    category,
    description,
    problem,
    approach,
    solution,
    result,
    techStack,
    githubLink,
    liveLink,
    isFeatured,
    isPublished,
  }) {
    try {
      const payload = {
        title,
        category,
        description,
        problem,
        approach,
        solution,
        result,
        techStack,
        githubLink,
        liveLink,
        isFeatured,
        isPublished,
      };
      const response = await apiClient.post("/Projects/createProject", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdminProjects({}) {
    try {
      const response = await apiClient.get("/Projects/getAllAdminProjects");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAdminProjectByID({ id }) {
    try {
      const response = await apiClient.get(
        `/Projects/getAdminProjectByID/${id}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProject({ id, ...updatedData }) {
    try {
      const response = await apiClient.patch(
        `/Projects/updateProject/${id}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject({ id }) {
    try {
      const response = await apiClient.delete(`/Projects/deleteProject/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPublicProjects({ username, featured, cateogary }) {
    try {
      const response = await apiClient.get(
        `/Projects/getPublicProjects/${username}`,
        {
          params: {
            featured: featured,
            cateogary: cateogary,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProjectBySlug({ username, slug }) {
    try {
      const response = await apiClient.get(
        `/Projects/getProjectBySlug/${username}/${slug}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const projectServices = new ProjectServices();

export default projectServices;
