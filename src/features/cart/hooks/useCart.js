// src/features/cart/hooks/useCart.js
import { useQuery } from '@tanstack/react-query';
import { getCartViewData } from '@/features/cart/services/cartService';

export function useCart(restaurantId, sessionId) {
  return useQuery({
    queryKey: ['cart', restaurantId],
    queryFn: () => getCartViewData(restaurantId, sessionId),
    staleTime: 0, // always refetch fresh data
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}