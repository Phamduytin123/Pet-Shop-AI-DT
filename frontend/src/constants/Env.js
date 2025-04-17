// All environment variables should be defined here

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888/api/v1';
const STRICT_MODE = import.meta.env.VITE_STRICT_MODE || false;

export { API_BASE_URL, STRICT_MODE };