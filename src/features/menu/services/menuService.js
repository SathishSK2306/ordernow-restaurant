// src/features/menu/services/menuService.js
import {http} from '@/libs/http/client';

/**
 * Fetches the menu data from the API.
 * @returns {Promise<Object>} The menu data.
 */
export async function fetchMenu() {
    const response = await http.get('/menu');
    console.log('Menu data fetched:', response.data);
    return response.data;
}