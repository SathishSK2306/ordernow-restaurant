import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ENV } from '@/config/env';

const imageBaseUrl = ENV.IMAGE_BASE_URL;

export function CollapsedCarousel({ welcomeImageUrl, logoUrl, onExpand }) {
  return (
    <div className="relative mb-6 -mx-4 -my-2">
      {/* Container Card */}
      <div 
        className="relative h-24 rounded-lg overflow-hidden shadow-md"
        style={{ backgroundImage: `url('${imageBaseUrl}/${welcomeImageUrl}')` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 flex items-center justify-between h-full p-4 text-white">
          {/* Logo on the left */}
          {logoUrl && (
            <img
              src={`${imageBaseUrl}/${logoUrl}`}
              alt="Restaurant Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shrink-0 mr-4"
            />
          )}

          {/* "Expand Highlights" button */}
          <Button
            className="w-full flex justify-between items-center pl-4 pr-2 text-base rounded-full backdrop-blur-sm bg-white/40 text-white hover:bg-white/50"
            onClick={onExpand}
          >
            <span>Expand Highlights</span>
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}