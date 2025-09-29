// src/lib/http/client.js
import axios from 'axios';
import { ENV } from '@/config/env';
import { handleHttpError } from '@/lib/http/errorHandler';

const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: true, // Include cookies in requests by default
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Your response interceptor is still useful for global error handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    handleHttpError(error);
    return Promise.reject(error);
  }
);

export default http;
