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

// export async function fetchRestaurantDetails(restaurantId) {
//     const response = await http.get(`/restaurants/${restaurantId}`);
//     console.log('Restaurant details fetched:', response.data);
//     return response.data;
// }

export async function fetchRestaurantDetails(restaurantId) {
    console.log(' Mock fetching restaurant details for ID:', restaurantId);
    // Mock data
    return {
        id: restaurantId,
        name: 'Burrito Factory',
        address: '1485 N Milpitas Blvd, Milpitas, CA 95035',
        latitude: 37.425841,
        longitude: -121.905625,
        phone: '123-456-7890',
        cuisine: 'Mexican',
        rating: 4.5,
    };
}
