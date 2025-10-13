// src/lib/http/errorHandler.js
import { toast } from 'sonner';

export function handleHttpError(error) {
    if (error.response) {
        const { status, data, config } = error.response;

        if(status === 401 && config.url.endsWith('/auth/me')) {
            // Silently handle 401 errors from /auth/me to avoid unnecessary toasts
            console.log('Silent 401 from /auth/me - user is not authenticated.');
            return;
        }

        let toastMessage = data.detail || data?.message || 'An error occurred. Please try again later.';
        console.log('HTTP Error:', error.response);

        switch (status) {
            case 400:
                console.error('Bad Request:', data);
                break;
            case 401:
                console.error('Unauthorized:', data);
                // TODO: Optionally, you can trigger a logout or redirect to login here
                toastMessage = 'You are not logged in. Please log in to continue.';
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

        toast.error(toastMessage, { duration: 5000 });
    } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from the server. Please check your network connection.', { duration: 5000 });
    } else {
        console.error('Request error:', error.message);
        toast.error('An unexpected error occurred. Please try again later.', { duration: 5000 });
    }
}
