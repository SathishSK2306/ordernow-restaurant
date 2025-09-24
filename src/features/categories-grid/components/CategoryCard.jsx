// src/features/categories-grid/components/CategoryCard.jsx

import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ENV } from "@/config/env";

const imageBaseUrl = ENV.IMAGE_BASE_URL;

const CategoryCard = ({ category, onClick }) => {
  const imageUrl = category.image_url
    ? `${imageBaseUrl}/${category.image_url}`
    : "/placeholder-category.webp";

  return (
    <Card
      className="cursor-pointer overflow-hidden border-none shadow-none rounded-none p-0"
      onClick={onClick}
    >
      <div className="relative">
        <AspectRatio ratio={2 / 2}>
          <img
            src={imageUrl}
            alt={category.name}
            className="object-cover w-full h-full"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 "></div>
        </AspectRatio>

        <CardContent className="absolute bottom-0 left-0 right-0">
          <h3 className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {category.name}
          </h3>
        </CardContent>
      </div>
    </Card>
  );
};

export default CategoryCard;