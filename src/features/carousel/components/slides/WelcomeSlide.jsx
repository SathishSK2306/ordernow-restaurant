import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ENV } from '@/config/env';

const imageBaseUrl = ENV.IMAGE_BASE_URL;

export function WelcomeSlide({
  restaurantName,
  welcomeImageUrl,
  logoUrl,
  featuredItemTitle,
  className,
  showLogoFront = false,
  ...props
}) {
  return (
    <div className={cn("relative h-[100%]", className)} {...props}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageBaseUrl}/${welcomeImageUrl}')` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-30"></div>

      {showLogoFront ? (
        // Collapsed: Only logo centered
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {logoUrl && (
            <img
              src={`${imageBaseUrl}/${logoUrl}`}
              alt={`${restaurantName} Logo`}
              className="w-20 h-20 rounded-full object-cover border-4 border-white bg-white shadow-lg"
            />
          )}
        </div>
      ) : (
        // Expanded: Full content
        <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-8 text-white">
          {logoUrl && (
            <img
              src={`${imageBaseUrl}/${logoUrl}`}
              alt={`${restaurantName} Logo`}
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white bg-white"
            />
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
            Welcome to {restaurantName}
          </h1>
          <p className="text-base md:text-lg mb-5 drop-shadow-sm">
            Swipe for insights about this store and highlights from the menu.
          </p>
          {featuredItemTitle && (
            <Button
              className="w-fit pl-4 pr-2 text-base rounded-full backdrop-blur-sm bg-white/40 text-white hover:bg-white/50"
            >
              {featuredItemTitle} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}