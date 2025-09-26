// src/lib/http/client.js
import axios from 'axios';
import { ENV } from '@/config/env';
import { handleHttpError } from '@/lib/http/errorHandler';

// ⛔️ REMOVE THIS
// let getAccessToken = () => null; 
// ⛔️ REMOVE THIS
// export const setAccessTokenGetter = (getter) => { ... };

const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// ⛔️ REMOVE THE REQUEST INTERCEPTOR or simplify it if needed for other headers
// http.interceptors.request.use( ... );

// Your response interceptor is still useful for global error handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    handleHttpError(error);
    return Promise.reject(error);
  }
);

export default http;
