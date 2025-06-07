import {useEffect, useState} from 'react';
import { fetchMenuViewData } from '../services/menuService';

/**
 * Custom hook to fetch and manage menu data.
 * @param {string} restaurantId - The ID of the restaurant for which to fetch the menu.
 * @returns {Object} An object containing the menu data, loading state, and error state.
 */

export function useMenu(restaurantId) {
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () =>{
        if(!restaurantId) return;

        const loadMenu = async () => {
            try{
                const data = await fetchMenuViewData(restaurantId);
                setMenuData(data);
            }catch(error) {
                console.error('Error fetching menu data:', error);
                // Optionally, you can set an error state here
            }finally {
                setLoading(false);
            }
        }

        loadMenu();
    },[restaurantId]);

    return { menuData, loading };
}