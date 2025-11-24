import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API error', error);
    }
    return Promise.reject(error);
  }
);
