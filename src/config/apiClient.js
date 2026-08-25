import axios from "axios";
import conf from "../config/config.js";

const apiClient = axios.create({
  baseURL: conf.backendApi,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  config.wakeupTimer = setTimeout(() => {
    window.dispatchEvent(new Event("server-waking"));
  }, 2000);
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    if (response.config && response.config.wakeupTimer) {
      clearTimeout(response.config.wakeupTimer);
    }
    window.dispatchEvent(new Event("server-awake"));
    return response;
  },
  async (error) => {
    if (error.config && error.config.wakeupTimer) {
      clearTimeout(error.config.wakeupTimer);
    }
    window.dispatchEvent(new Event("server-awake"));

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes("/admin/refreshAccessToken")) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          `${conf.backendApi}/admin/refreshAccessToken`,
          {},
          {
            withCredentials: true,
          },
        );

        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
