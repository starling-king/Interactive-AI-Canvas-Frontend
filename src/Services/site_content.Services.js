import apiClient from "../config/apiClient";

class SiteContentServices {
  async writeContent({ sectionKey, contentValue, contentType }) {
    try {
      const payload = {
        sectionKey,
        contentValue,
        contentType,
      };
      const response = await apiClient.post("/content/writeContent", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async read({ user }) {
    try {
      const response = await apiClient.get(`/content/read/${user}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const siteContentServices = new SiteContentServices();

export default siteContentServices;
