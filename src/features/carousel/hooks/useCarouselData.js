import { useQuery } from '@tanstack/react-query';
import { fetchCarouselData } from '../services/carouselService';

export function useCarouselData(restaurantId) {
  return useQuery({
    queryKey: ['carousel', restaurantId],
    queryFn: () => fetchCarouselData(restaurantId),
    enabled: !!restaurantId,
    // Add a staleTime if you want to reuse the data for a period without refetching.
    // For a landing page, 5 minutes might be reasonable.
    // staleTime: 1000 * 60 * 5, 
  });
}