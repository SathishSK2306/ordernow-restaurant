import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { ENV } from "@/config/env";

const imageBaseUrl = ENV.IMAGE_BASE_URL;

// --- Fetch restaurant default image ---
// This should call the Restaurants API
function fetchOwnerImage(restaurantId) {
  return fetch(
    `https://68767541814c0dfa653c2c85.mockapi.io/slider`
  )
    .then(res => res.json())
    .then(data => {
      const restaurant = data.results?.find(r => r.id === restaurantId);
      if (!restaurant || !restaurant.logo_url) return null;
      return {
        image_url: restaurant.logo_url,      // restaurant default logo/image
        username: "the Owner",
        dishName: "From the Owner"
      };
    });
}

// --- Fetch customer gallery photos ---
// This now ONLY fetches customer-uploaded images
function fetchGalleryImages(restaurantId) {
  return fetch(
    `http://localhost:8000/v1/restaurants/${restaurantId}/customer-photos?limit=100`
  )
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) return [];
      return data.map(photo => ({
        image_url: photo.image_url,                 
        username: photo.username || "Anonymous",     
        dishName: photo.menu_item_name || "Dish"      
      }));
    });
}


export default function CustomerGalleryPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // --- Owner Image ---
  const { 
    data: ownerImage, 
    isLoading: isOwnerLoading,
    isError: isOwnerError,
  } = useQuery({
    queryKey: ["ownerImage", restaurantId],
    queryFn: () => fetchOwnerImage(restaurantId),
    enabled: !!restaurantId,
  });

  // --- Customer Photos ---
  const { 
    data: customerPhotos, 
    isLoading: isGalleryLoading,
    isError: isGalleryError,
  } = useQuery({
    queryKey: ["gallery", restaurantId],
    queryFn: () => fetchGalleryImages(restaurantId),
    enabled: !!restaurantId,
  });

  const isLoading = isOwnerLoading || isGalleryLoading;
  const isError = isOwnerError || isGalleryError;

  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (isError) return <div className="text-center py-6 text-red-600">Failed to load images.</div>;

  const allImages = ownerImage ? [ownerImage, ...(customerPhotos || [])] : (customerPhotos || []);
  if (!allImages.length) return <div className="text-center py-6">No photos found.</div>;

  const totalPhotos = allImages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Fixed Top Bar --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-3 bg-white border-b h-14">
        <ChevronLeft
          className="w-6 h-6 cursor-pointer text-black font-bold"
          onClick={() => navigate(-1)}
        />
        <span className="ml-4 font-semibold text-lg">{totalPhotos} Photos</span>
      </div>

     

      {/* --- Gallery Grid with Smooth Animations --- */}
      <div className="grid grid-cols-2 gap-1 p-0">
        {allImages.map((img, idx) => {
          const itemClass = idx === 0 ? "col-span-2" : "";

          return (
            <div
              key={img.image_url || idx}
              className={`relative overflow-hidden rounded-sm group ${itemClass} transform transition duration-800 ease-in-out hover:scale-105 `}
            >
              <img
                src={`${imageBaseUrl}/${img.image_url} `}
                alt={img.dishName || `Photo by ${img.username}`}
                className="object-cover w-full h-[200px] opacity-0 animate-fade-in"
                onLoad={e => e.currentTarget.classList.remove("opacity-0")}
              />
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/70 to-transparent">
                <p className="font-bold text-white text-sm truncate">
                  {img.dishName || "Featured Dish"}
                </p>
                <p className="text-xs text-white">
                  {idx !== 0 ? `From ${img.username}` : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Animation Keyframes --- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
