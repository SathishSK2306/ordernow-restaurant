// src/features/cart/hooks/useCart.js
import { useQuery } from '@tanstack/react-query';
import { getCartViewData } from '@/features/cart/services/cartService';

export function useCart(restaurantId) {
  return useQuery({
    queryKey: ['cart', restaurantId],
    queryFn: () => getCartViewData(restaurantId),
    staleTime: 1000 * 60 * 1, // 1 minute. If set to 0, it always refetch fresh data
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!restaurantId, // Only run the query if restaurantId is provided
  });
}