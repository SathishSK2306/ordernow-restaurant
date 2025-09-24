import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ENV } from '@/config/env';

const imageBaseUrl = ENV.IMAGE_BASE_URL;

export function CustomerPhotosSlide({ photos, className, ...props }) {
  // Use all available photos for the grid
  const photosToDisplay = photos.slice(0, 3);

  return (
    <div className={cn("relative h-full p-4 md:p-8", className)} {...props}>
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Customer photos</h2>
      
      {/* Grid layout with two different column widths and equal row heights */}
      <div 
        className="grid grid-cols-[1.5fr_2fr] grid-rows-2 gap-3 w-full h-[calc(100%-4rem)]"
        style={{
          gridTemplateAreas: `'top-left top-right' 'bottom bottom'`
        }}
      >
        {/* Top-left image (narrower) */}
        {photosToDisplay[0] && (
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden [grid-area:top-left]"
            style={{ backgroundImage: `url('${imageBaseUrl}/${photosToDisplay[0].image_url}')` }}
          >
            <span className="absolute bottom-2 left-2 text-xs text-white drop-shadow-sm">
              From {photosToDisplay[0].username}
            </span>
          </div>
        )}
        
        {/* Top-right image (wider) */}
        {photosToDisplay[1] && (
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden [grid-area:top-right]"
            style={{ backgroundImage: `url('${imageBaseUrl}/${photosToDisplay[1].image_url}')` }}
          >
            <span className="absolute bottom-2 left-2 text-xs text-white drop-shadow-sm">
              From {photosToDisplay[1].username}
            </span>
          </div>
        )}
        
        {/* Bottom, full-width image */}
        {photosToDisplay[2] && (
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden [grid-area:bottom]"
            style={{ backgroundImage: `url('${imageBaseUrl}/${photosToDisplay[2].image_url}')` }}
          >
            <span className="absolute bottom-2 left-2 text-xs text-white drop-shadow-sm">
              From {photosToDisplay[2].username}
            </span>
          </div>
        )}
      </div>
      
      {/* "See photo gallery" Button */}
      <div className="absolute right-6 bottom-13 flex justify-center">
        <button
            className="shrink-0 px-2.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap bg-gray-100 text-gray-800" 
          >
            See photo gallery
          </button>
      </div>
    </div>
  );
}
