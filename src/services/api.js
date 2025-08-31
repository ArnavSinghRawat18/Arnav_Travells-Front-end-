import axios from "axios";

// Prefer the more frequently used REACT_APP_API_URL (matches src/config/api.js),
// fall back to REACT_APP_API_BASE for compatibility, then default to localhost for dev.
const API_BASE = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE || "http://localhost:3500";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
