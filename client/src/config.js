// Centralized configuration for Urban Maharaja frontend
export const API_BASE_URL = import.meta.env.VITE_API_URL || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://urban-maharaja-luxury-royal-indian-fine.onrender.com/api'
);
