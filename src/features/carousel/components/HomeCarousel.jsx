import { useParams } from 'react-router-dom';
import { useCarouselData } from '@/features/carousel/hooks/useCarouselData';

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { WelcomeSlide } from "@/features/carousel/components/slides/WelcomeSlide";
import { CustomerPhotosSlide } from "@/features/carousel/components/slides/CustomerPhotosSlide";
import { RestaurantSpecialsSlide } from "@/features/carousel/components/slides/RestaurantSpecialsSlide";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import Autoplay from 'embla-carousel-autoplay'

export function HomeCarousel({ onCollapse }) {
  const { restaurantId } = useParams();
  const { data: carouselData, isLoading, isError } = useCarouselData(restaurantId);

  if (isLoading) {
    return <div className="text-center py-6 text-gray-600">Loading carousel...</div>;
  }
  
  if (isError || !carouselData) {
    return null; // Don't render anything if there's an error or no data
  }

  const hasCarouselContent = 
    carouselData?.welcome_slide ||
    (carouselData?.customer_photos && carouselData.customer_photos.length > 0) ||
    (carouselData?.restaurant_specials && carouselData.restaurant_specials.length > 0);

  if (!hasCarouselContent) {
    return null; // Don't render the carousel if there is no data
  }

  return (
     <div className="relative mb-6 -mx-4 -my-2">
      <Carousel
          // Autoplay configuration: delay of 5 seconds, stop on user interaction
          plugins={[
              Autoplay({ 
                  delay: 5000, 
                  stopOnInteraction: true 
              })
          ]}>
        <CarouselContent>
          {/* Welcome slide is always rendered if there's data */}
          {carouselData?.welcome_slide && (
            <CarouselItem>
              <WelcomeSlide
                restaurantName={carouselData.welcome_slide.name}
                welcomeImageUrl={carouselData.welcome_slide.image_url}
                logoUrl={carouselData.welcome_slide.logo_url}
                featuredItemTitle={carouselData.welcome_slide.featured_item_title}
              />
            </CarouselItem>
          )}

          {/* Customer photos slide is only rendered if data exists */}
          {carouselData?.customer_photos && carouselData.customer_photos.length > 0 && (
            <CarouselItem className={"bg-[#313131]"}>
              <CustomerPhotosSlide photos={carouselData.customer_photos} />
            </CarouselItem>
          )}

          {carouselData?.restaurant_specials && carouselData.restaurant_specials.length > 0 && (
            <CarouselItem className={"bg-[#313131]"}>
              <RestaurantSpecialsSlide items={carouselData.restaurant_specials} />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      {/* Collapse Button */}
      <Button 
          className="absolute bottom-2 right-6 h-5 rounded-full text-white "
          onClick={onCollapse}
          style={{ padding: '1px 4px 1px 8px' }}
          variant="link"
      >
        <span>Collapse</span>
        <ChevronUp className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default HomeCarousel;