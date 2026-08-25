import apiClient from "../config/apiClient";

class ContactMessageService {
  async SavetheDataOfForm({ name, email, message, username }) {
    try {
      const payload = {
        name: name,
        email: email,
        message: message,
      };
      const response = await apiClient.post(
        `/Message/saveMessage/${username}`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async DiscoverMessage({}) {
    try {
      const response = await apiClient.patch("/Message/DiscoverMessage");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const contactMessageService = new ContactMessageService();

export default contactMessageService;
