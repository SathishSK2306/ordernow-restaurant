// src/features/menu/services/menuService.js
import http from '@lib/http/client';

/**
 * Fetches the menu data from the API.
 * @returns {Promise<Object>} The menu data.
 */
export async function fetchMenuViewData(restaurantId) {
    const response = await http.get(`/restaurants/${restaurantId}/menu-view`);
    console.log('Menu data fetched:', response.data);
    return response.data;
}

