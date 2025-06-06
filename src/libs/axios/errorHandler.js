// src/lib/api/axios/errorHandler.js

export function handleAxiosError(error) {
    if (error.response) {
        const { status, data } = error.response;
        // Handle specific status codes if needed
        switch (status) {
            case 400:
                console.error('Bad Request:', data);                
                break;
            case 401:
                console.error('Unauthorized:', data);
                break;
            case 403:
                console.error('Forbidden:', data);
                break;
            case 404:
                console.error('Not Found:', data);
                break;
            case 500:
                console.error('Internal Server Error:', data);
                break;
            default:
                console.error(`Error ${status}:`, data);
        }
    }
}
    