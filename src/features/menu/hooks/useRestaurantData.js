import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantDetails } from "../services/menuService";

export function useRestaurantData(restaurantId) {
  return useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => fetchRestaurantDetails(restaurantId),

    // This data changes infrequently, so we can cache it longer
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours

    // Prevents refetching on mount or window focus, since restaurant details rarely change
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    
    enabled: !!restaurantId, // Only run the query if restaurantId is provided
  });
}

