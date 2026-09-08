import apiClient from "../config/apiClient";

class UserServices {
  async registerUser({ username, email, passwordHash }) {
    try {
      // Keys now exactly match backend requirements
      const payload = { username, email, passwordHash };
      const response = await apiClient.post("/users/register", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, username, passwordHash }) {
    try {
      // Backend supports either username OR email + passwordHash
      const payload = { email, username, passwordHash };
      const response = await apiClient.post("/users/login", payload);

      if (response.data.success !== true) {
        throw new Error(
          response.data.message || "Operation failed on backend."
        );
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logoutUser() {
    try {
      const response = await apiClient.post("/users/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changeCurrentPassword({ oldpassword, newpassword }) {
    try {
      // Keys forced to lowercase to match backend destructuring
      const payload = { oldpassword, newpassword };
      const response = await apiClient.post("/users/changePassword", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiClient.get(
        `/users/getCurrentUser?t=${new Date().getTime()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminDetails({ username, email }) {
    try {
      const payload = { username, email };
      // Aligned with the controller name
      const response = await apiClient.post("/users/updateAdminDetails", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken() {
    try {
      const response = await apiClient.post("/users/refreshAccessToken");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const userServices = new UserServices();
export default userServices;