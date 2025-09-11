// src/lib/http/client.js
import axios from 'axios';
import { ENV } from '@/config/env';
import { handleHttpError } from '@/lib/http/errorHandler';

// Placeholder function to be set by the AuthContext later
let getAccessToken = () => null;

// Function to set the getter from AuthContext
export const setAccessTokenGetter = (getter) => {
  getAccessToken = getter;
};

const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: true, // Include credentials like cookies in requests
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // For ngrok
  },
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors, including 401 Unauthorized
    // The transparent refresh logic would go here if not handled by a dedicated service
    handleHttpError(error);
    return Promise.reject(error);
  }
);

export default http;