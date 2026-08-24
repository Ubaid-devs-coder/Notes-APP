import axios from "axios";

// Base URL comes from .env — falls back to localhost if not set
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://notes-app-cpp8.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required — backend uses HTTP-only cookies for JWT
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attaches the stored JWT as a Bearer header on every
// request. This is what actually keeps the user logged in: the httpOnly
// cookie is cross-site (frontend on vercel.app, backend on onrender.com) and
// gets silently blocked by Safari/Firefox/many-Chrome-configs as a
// third-party cookie, even though login/register still "succeed" (the
// success response itself doesn't depend on the cookie being stored).
// The Authorization header is not subject to that restriction at all.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handles common error cases in one place
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the token is invalid/expired, backend will send 401
    if (error.response?.status === 401) {
      // We are not redirecting here directly — AuthContext will handle
      // logout/redirect logic once it's built, so this stays reusable.
      console.warn("Unauthorized — session may have expired.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
