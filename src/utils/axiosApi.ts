import axios from 'axios';

//const apiDevPort = import.meta.env.VITE_API_DEV_PORT;

const api = axios.create({
  baseURL: 'http://localhost:3000', // ,apiDevPort
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
