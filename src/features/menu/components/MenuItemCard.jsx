import QuickAddButton from "./QuickAddButton";
import {useParams} from "react-router-dom";
import {Badge} from "@components/ui/badge";
import { useMenuItemQtyInCart } from "../hooks/useMenuItemQtyInCart";
import { cn } from "@/lib/utils";
import { ENV } from '@/config/env';

const imageBaseUrl = ENV.IMAGE_BASE_URL;

const MenuItemCard = ({ 
  item, 
  onItemClick, 
  variant = 'image-right', 
  className 
}) => {
  const { restaurantId } = useParams();
  const quantityInCart = useMenuItemQtyInCart(restaurantId, item.id);
  
  const isImageRight = variant === 'image-right';
  const isImageTop = variant === 'image-top';
  const isImageCenter = variant === 'image-center';

  const handleClick = () => {
    if (onItemClick && isImageRight) {
      onItemClick(item);
    }
  };

  return (
    <div 
      className={cn(
        "relative flex rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden",
        "bg-white text-black",
        isImageRight ? "h-35 flex-row border border-gray-200" : "flex-col",
        isImageCenter && "h-full",
        className
      )}
      onClick={handleClick}
    >
      {/* Image Section */}
      {item.image_url && (
        <div className={cn(
          "relative shrink-0",
          isImageRight ? "w-32 h-full order-2" : "w-full",
          isImageTop ? "h-32" : "",
          isImageCenter ? "h-full" : ""
        )}>
          <img
            src={`${imageBaseUrl}/${item.image_url}`}
            alt={item.name}
            className="w-full h-full object-cover"
          /> 
          {/* Badge for Qty in Cart */}
          {quantityInCart > 0 && 
            <Badge className="absolute top-2 left-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-black">
              {quantityInCart} in cart
            </Badge>
          }
          {/* Quick Add Button over image*/}
          <QuickAddButton item={item} restaurantId={restaurantId} />
        </div>
      )}

      {/* Text Content */}
      <div className={cn(
        "flex-1 p-4 flex",
        isImageRight ? "flex-col justify-between" : "flex-col justify-between",
        isImageCenter && "absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white z-10"
      )}>
        <div>
          <h4 className={cn("font-semibold", isImageRight ? "text-lg text-gray-900" : "text-base")}>
            {item.name}
          </h4>
          {item.description && isImageRight && (
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          )}
        </div>
        {!(isImageCenter || isImageTop) && (
          <p className="text-sm font-medium text-green-700 mt-2">₹{item.price.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};
export default MenuItemCard;