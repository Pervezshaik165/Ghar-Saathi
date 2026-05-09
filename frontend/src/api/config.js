export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://ghar-saathi.onrender.com';

export function apiUrl(path) {
  // ensure leading slash
  if (!path.startsWith('/')) path = `/${path}`;
  return `${API_BASE}${path}`;
}
