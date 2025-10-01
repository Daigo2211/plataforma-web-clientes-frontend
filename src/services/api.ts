import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:44371';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Error en la operación';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);