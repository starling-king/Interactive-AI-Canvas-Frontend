import apiClient from "../config/apiClient";

class ProjectImagesServices {
  async CreateImageCollectionOfProject({ projectId, imageFiles }) {
    try {
      const formData = new FormData();

      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("images", imageFiles[i]);
      }

      const response = await apiClient.post(
        `/images/projects/${projectId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async DeleteImages({ projectId, imageId }) {
    try {
      const response = await apiClient.delete(
        `/images/projects/${projectId}/Deleteimage/${imageId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const projectImagesServices = new ProjectImagesServices();

export default projectImagesServices;
