const envBase = import.meta.env.VITE_BACKEND_URL;
const fallbackBase = "https://ghar-saathi.onrender.com";

export const API_BASE = (envBase || fallbackBase).replace(/\/+$/, "");

export function apiUrl(path) {
  // ensure leading slash
  if (!path.startsWith('/')) path = `/${path}`;
  return `${API_BASE}${path}`;
}
