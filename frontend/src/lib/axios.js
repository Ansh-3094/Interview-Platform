import axios from "axios";

function normalizeApiBaseUrl(rawUrl) {
  if (!rawUrl) return rawUrl;

  const trimmed = rawUrl.trim().replace(/\/+$/, "");

  if (/\/api$/i.test(trimmed)) {
    return trimmed;
  }

  return `${trimmed}/api`;
}

const axiosInstance = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL),
  withCredentials: true, // By adding this field browser will send cookie to server automatically on every single request
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await window?.Clerk?.session?.getToken?.();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // If token retrieval fails, request will proceed and backend will return 401.
  }

  return config;
});

export default axiosInstance;
