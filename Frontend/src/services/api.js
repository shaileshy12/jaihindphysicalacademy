import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  withCredentials: true,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

// ================= RESPONSE INTERCEPTOR =================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    // Handle unauthorized globally

    if (error.response?.status === 401) {
      console.error("Unauthorized access");
    }

    return Promise.reject(error);
  },
);

export default API;
