import { useParams } from "react-router-dom";
import { useCarouselData } from "@/features/carousel/hooks/useCarouselData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { WelcomeSlide } from "@/features/carousel/components/slides/WelcomeSlide";
import { CustomerPhotosSlide } from "@/features/carousel/components/slides/CustomerPhotosSlide";
import { RestaurantSpecialsSlide } from "@/features/carousel/components/slides/RestaurantSpecialsSlide";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { ENV } from "@/config/env";



export function HomeCarousel({ isCollapsed, onCollapse }) {
  const { restaurantId } = useParams();
  const {
    data: carouselData,
    isLoading,
    isError,
  } = useCarouselData(restaurantId);

  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-600">
        Loading carousel...
      </div>
    );
  }

  if (isError || !carouselData) {
    return null;
  }

  const welcomeSlide = carouselData?.welcome_slide;
  const imageBaseUrl = ENV.IMAGE_BASE_URL;
  const backgroundImageUrl = welcomeSlide?.image_url
    ? `${imageBaseUrl}/${welcomeSlide.image_url}`
    : "";
  const logoUrl = welcomeSlide?.logo_url
    ? `${imageBaseUrl}/${welcomeSlide.logo_url}`
    : "";

  const carouselPlugins = isCollapsed
    ? []
    : [Autoplay({ delay: 5000, stopOnInteraction: true })];

  const COLLAPSED_HEIGHT = 130;
  const EXPANDED_HEIGHT = 335; // Adjust as needed for your design
  // ---------- Collapsed ----------
  if (isCollapsed) {
    return (
      <div className="relative transition-all duration-700">
      <div
        className=" transition-all duration-700 rounded-b-lg"
        style={{
           height: isCollapsed ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
        minHeight: isCollapsed ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none rounded-b-lg duration-700" />

        {/* Logo */}
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className="absolute left-6 bottom-6 translate-y-1/2 w-20 h-20 rounded-full object-cover border-2
             border-white bg-white shadow-lg z-50 transition-transform duration-700 ease-in-out"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              transition: "opacity 0.5s",
            }}
          />
        )}
</div>
        {/* Expand button */}
        <Button
          className="flex items-center px-12 py-2 rounded-full text-white font-semibold shadow-md absolute right-2 bottom-2 "
          onClick={onCollapse}
          variant="link"
        >
          <span>Expand highlights</span>
          <ChevronDown className="w-5 h-5 ml-2 duration-700" />
        </Button>
      </div>
    );
  }

  // ---------- Expanded ----------
  return (
    <div
      className="relative w-full transition-all duration-700 overflow-hidden "
      style={{
        height: `${EXPANDED_HEIGHT}px`,
        minHeight: `${EXPANDED_HEIGHT}px`,
        background: "#fff", // optional, for consistency
      }}
    >
      <Carousel plugins={carouselPlugins}>
        <CarouselContent>
          {welcomeSlide && (
            <CarouselItem>
              <WelcomeSlide
                restaurantName={welcomeSlide.name}
                welcomeImageUrl={welcomeSlide.image_url}
                logoUrl={welcomeSlide.logo_url}
                featuredItemTitle={welcomeSlide.featured_item_title}
                showLogoFront={false}
              />
            </CarouselItem>
          )}

          {carouselData?.customer_photos?.length > 0 && (
            <CarouselItem className="bg-[#313131]">
              <CustomerPhotosSlide
                photos={carouselData.customer_photos}
              />
            </CarouselItem>
          )}

          {carouselData?.restaurant_specials?.length > 0 && (
            <CarouselItem className="bg-[#313131]">
              <RestaurantSpecialsSlide
                items={carouselData.restaurant_specials}
              />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      {/* Collapse button */}
      <Button
        className="absolute bottom-2 right-6 h-5 rounded-full text-white duration-700"
        onClick={onCollapse}
        style={{ padding: "1px 4px 1px 8px" }}
        variant="link"
      >
        <span>Collapse</span>
        <ChevronDown className="w-4 h-4 transition-transform rotate-180 duration-500" />
      </Button>
    </div>
  );
}

export default HomeCarousel;