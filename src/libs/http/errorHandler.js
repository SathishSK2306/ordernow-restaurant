// src/lib/http/errorHandler.js
import { showToast} from '@/utils/toast';

export function handleHttpError(error) {
    if (error.response) {
        //console.error( error );
        const { status, data } = error.response;
        let toastMessage = data?.message || 'An error occurred. Please try again later.';
        // Handle specific status codes if needed
        switch (status) {
            case 400:
                console.error('Bad Request:', data);             
                break;
            case 401:
                console.error('Unauthorized:', data);
                toastMessage = 'You are not authorized. Please log in again.';
                break;
            case 403:
                console.error('Forbidden:', data);
                toastMessage = 'You do not have permission to perform this action.';
                break;
            case 404:
                console.error('Not Found:', data);
                toastMessage = 'The requested resource was not found.';
                break;
            case 500:
                console.error('Internal Server Error:', data);
                toastMessage = 'Server error. Please try again later.';
                break;
            default:
                console.error(`Unhandled Error ${status}:`, data);
        }
        // Show a toast notification with the error message
        showToast(toastMessage, 'error', { autoClose: 5000 });
    }
    else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        showToast('No response from the server. Please check your network connection.', 'error', { autoClose: 5000 });
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request error:', error.message);
        showToast('An unexpected error occurred. Please try again later.', 'error', { autoClose: 5000 });
    }
}
    