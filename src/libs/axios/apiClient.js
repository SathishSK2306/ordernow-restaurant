import axios from 'axios';
import { ENV } from '@/config/env';
import { handleAxiosError } from '@/libs/axios/errorHandler';

const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add custom logic here, like adding auth tokens
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can add custom logic here, like handling specific response codes
    return response;
  },
  (error) => {
    // Handle errors globally
    handleAxiosError(error);
    return Promise.reject(error);
  }
);

export default apiClient;