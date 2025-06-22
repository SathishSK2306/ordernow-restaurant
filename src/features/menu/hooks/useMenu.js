// src/features/menu/hooks/useMenu.js
import { useQuery } from '@tanstack/react-query';
import { fetchMenuViewData } from '../services/menuService';

export function useMenu(restaurantId) {
  return useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => fetchMenuViewData(restaurantId),
    enabled: !!restaurantId,
  });
}
