// src/libs/http/client.js
import axios from 'axios';
import { ENV } from '@/config/env';
import { handleHttpError } from '@/lib/http/errorHandler';

const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
http.interceptors.request.use(
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
http.interceptors.response.use(
  (response) => {
    // You can add custom logic here, like handling specific response codes
    return response;
  },
  (error) => {
    // Handle errors globally
    handleHttpError(error);
    return Promise.reject(error);
  }
);

export default http;