import apiClient from "../config/apiClient";

class ResumeBuilderSurvice {
  async CreateAiResume(title, targetKeywords, customLinks) {
    try {
      const payload = {
        title,
        targetKeywords,
        customLinks,
      };

      const response = await apiClient.post("/Resume/Make", payload);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async ReadResume(username) {
    try {
      const response = await apiClient.get(`/Resume/PublicRead/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const resumeBuilderSurvice = new ResumeBuilderSurvice();

export default resumeBuilderSurvice;
