// src/features/checkout/hooks/usePickupDirections.js
import { useQuery } from '@tanstack/react-query';
import { getDirections } from '@/features/checkout/services/checkoutService';

/**
 * A custom hook to fetch the pickup location details and distance.
 * It uses the React Query cache to manage and optimize data fetching.
 *
 * @param {string} restaurantAddress The address of the restaurant to get directions for.
 * @returns {Object} An object containing the query data, loading state, and error state.
 */
export function usePickupDirections(restaurantAddress) {
  return useQuery({
    queryKey: ['pickupDirections', restaurantAddress],
    queryFn: () => getDirections(restaurantAddress),
    // Only run this query if we have a valid restaurant address.
    // This prevents the query from running on initial component mount before the address is available.
    enabled: !!restaurantAddress,
  });
}