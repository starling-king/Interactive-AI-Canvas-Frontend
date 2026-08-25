import apiClient from "../config/apiClient";

class AdminServices {
  async registerUser({ name, email, password }) {
    try {
      const payload = {
        username: name,
        email: email,
        passwordHash: password,
      };
      const response = await apiClient.post("/admin/register", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login({ name, password }) {
    try {
      const payload = {
        username: name,
        passwordHash: password,
      };
      const response = await apiClient.post("/admin/login", payload);

      if (response.data.success !== true) {
        throw new Error(
          response.data.message || "Operation failed on backend.",
        );
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logoutUser() {
    try {
      const response = await apiClient.post("/admin/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changeCurrentPassword({ oldpassword, newpassword }) {
    try {
      const payload = {
        oldpassword: oldpassword,
        newpassword: newpassword,
      };
      const response = await apiClient.post("/admin/changePassword", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiClient.get(
        `/admin/getCurrentUser?t=${new Date().getTime()}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminDetails({ name, email }) {
    try {
      const payload = {
        username: name,
        email: email,
      };
      const response = await apiClient.post(
        "/admin/updateAdminDetails",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken() {
    try {
      const response = await apiClient.post("/admin/refreshAccessToken");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const adminServices = new AdminServices();

export default adminServices;
