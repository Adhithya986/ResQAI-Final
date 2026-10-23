// Centralized API configuration for ResQAI
export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Helper for building API endpoints
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

// Helper for uploaded disaster image URLs
export const getUploadUrl = (filename) => {
  if (!filename) return "";
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }
  return `${API_BASE_URL}/uploads/${filename}`;
};
