// src/features/cart/hooks/useCart.js
import { useQuery } from '@tanstack/react-query';
import { getCartViewData } from '@/features/cart/services/cartService';

export function useCart(restaurantId) {
  return useQuery({
    queryKey: ['cart', restaurantId],
    queryFn: () => getCartViewData(restaurantId),
    staleTime: 0, // always refetch fresh data
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}