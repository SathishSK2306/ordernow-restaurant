// src/config/env.js

function getEnvVariable(key, fallback = undefined) {
  const value = import.meta.env[key];
  if (value === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  API_BASE_URL: getEnvVariable('VITE_API_BASE_URL', 'http://localhost:8000/api/v1'), // Default to localhost if not set in .env
  IMAGE_BASE_URL: getEnvVariable('VITE_IMAGE_BASE_URL', 'https://images.example.com'), // Default image URL if not set in .env
  MAPBOX_ACCESS_TOKEN: getEnvVariable('VITE_MAPBOX_ACCESS_TOKEN', ''),
};
