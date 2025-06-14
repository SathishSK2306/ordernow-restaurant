// src/lib/http/errorHandler.js
import { toast } from 'sonner';

export function handleHttpError(error) {
    if (error.response) {
        const { status, data } = error.response;
        let toastMessage = data?.message || 'An error occurred. Please try again later.';

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

        toast.error(toastMessage, { duration: 5000 });
    } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from the server. Please check your network connection.', { duration: 5000 });
    } else {
        console.error('Request error:', error.message);
        toast.error('An unexpected error occurred. Please try again later.', { duration: 5000 });
    }
}
