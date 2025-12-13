import axios from "axios";

/**
 * Main API instance
 * Used for all normal authenticated requests
 */
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/users",
  withCredentials: true,
});

/**
 * Separate instance for refresh/logout
 * ❗ This must NOT use the interceptor
 */
const authApi = axios.create({
  baseURL: "http://localhost:3000/api/v1/users",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

/**
 * Resolve or reject all queued requests
 */
const processQueue = (error) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  // ✅ Success: do nothing
  (response) => response,

  // ❌ Error handler
  async (error) => {
    const originalRequest = error.config;

    // Only handle Unauthorized errors
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // ❗ If refresh itself failed → stop
    if (
      originalRequest._retry ||
      originalRequest.url.includes("/refresh-token")
    ) {
      return Promise.reject(error);
    }

    // If refresh already in progress → queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // 🔄 Try refreshing access token
      await authApi.post("/refresh-token");

      // Release queued requests
      processQueue(null);

      // Retry original request
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed → logout
      processQueue(refreshError);

      try {
        await authApi.post("/logout");
      } catch (_) {}

      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
