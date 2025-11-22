export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : import.meta.env.VITE_BACKEND_URL;
