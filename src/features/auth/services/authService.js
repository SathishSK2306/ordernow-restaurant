// src/features/auth/services/authService.js
import http from '@/lib/http/client';

/**
 * Fetches the currently authenticated user's data.
 * This will succeed if valid auth cookies are present.
 * @returns {Promise<Object|null>} The user data or null if not authenticated.
 */
export async function getCurrentUser() {
  try {
    const response = await http.get('/auth/me');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Expected when logged out → just return null
      return null;
    }
    throw error; // Only throw unexpected errors
  }
}

/**
 * Requests an OTP for either signup or signin.
 * @param {{ channel: string, contact: string, purpose: string }} data
 * @returns {Promise<Object>} The response containing the otp_id.
 */
export async function requestOtp(data) {
  const endpoint = data.purpose === 'register' ? '/auth/signup/otp/request' : '/auth/signin/otp/request';
  const response = await http.post(endpoint, data);
  return response.data;
}

/**
 * Verifies an OTP for signup or signin.
 * @param {{ otp_id: string, otp_input: string, channel: string, contact: string, purpose: string }} data
 * @returns {Promise<Object>} The response containing auth tokens and user session data.
 */
export async function verifyOtp(data) {
    const endpoint = data.purpose === 'register' ? '/auth/signup/otp/verify' : '/auth/signin/otp/verify';
    const response = await http.post(endpoint, data);
    return response.data;
}


/**
 * Logs the user out by invalidating the session on the backend.
 * @returns {Promise<void>}
 */
export async function logout() {
    // Note: The backend expects refresh_token and session_id.
    // Since HttpOnly cookies can't be read by JS, this part of the backend API
    // might need adjustment. A simpler approach is an endpoint that reads the
    // cookie on the server to invalidate it. For now, we call a generic logout endpoint.
    // If your backend /logout requires a body, you'll need to rethink how to get that info.
    // A common pattern is to have a simple POST /logout that doesn't require a body.
    await http.post('/auth/logout', {}); // Assuming a simplified logout
}

