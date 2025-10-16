import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { ENV } from "@/config/env";

const imageBaseUrl = ENV.IMAGE_BASE_URL;

export function CustomerPhotosSlide({ className, ...props }) {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  // Fetch first 3 photos from API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customerPhotos", restaurantId],
    queryFn: () =>
      fetch(
        `http://localhost:8000/v1/restaurants/${restaurantId}/customer-photos?limit=3`
      ).then(res => res.json()),
    enabled: !!restaurantId,
  });

  const photosToDisplay = data || []; // <-- use data directly

  if (isLoading)
    return <div className="text-white py-10 text-center">Loading photos...</div>;

  if (isError || !photosToDisplay.length)
    return <div className="text-white py-10 text-center">No photos available</div>;

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
        {photosToDisplay[0] && (
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden [grid-area:top-left]"
            style={{ backgroundImage: `url(${imageBaseUrl}/${photosToDisplay[0].image_url})` }}
          >
            <span className="absolute bottom-2 left-2 text-xs text-white drop-shadow-sm">
              From {photosToDisplay[0].username || "Owner"}
            </span>
          </div>
        )}
        {photosToDisplay[1] && (
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden [grid-area:top-right]"
            style={{ backgroundImage: `url(${imageBaseUrl}/${photosToDisplay[1].image_url})` }}
          >
            <span className="absolute bottom-2 left-2 text-xs text-white drop-shadow-sm">
              From {photosToDisplay[1].username}
            </span>
          </div>
        )}
        {photosToDisplay[2] && (
          <div
            className="relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden [grid-area:bottom]"
            style={{ backgroundImage: `url(${imageBaseUrl}/${photosToDisplay[2].image_url})` }}
          >
            <span className="absolute bottom-2 left-2 text-xs text-white drop-shadow-sm">
              From {photosToDisplay[2].username}
            </span>
          </div>
        )}
      </div>

      {/* "See photo gallery" Button */}
      <div className="absolute right-6 bottom-6 flex justify-center">
        <button
          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap bg-gray-100 text-gray-800 hover:bg-gray-200 relative -top-5"
          onClick={() => navigate(`/restaurant/${restaurantId}/gallery`)}
        >
          See photo gallery
        </button>
      </div>
    </div>
  );
}
