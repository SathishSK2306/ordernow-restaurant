// src/features/menu/components/MenuItemCard.jsx
import QuickAddButton from "./QuickAddButton";
import {useParams} from "react-router-dom";

const MenuItemCard = ({ item, onItemClick }) => {
  const { restaurantId } = useParams();

  return (
    <div className="flex border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden h-35" 
         onClick={() => onItemClick(item)}
    >
      {/* Left: Text Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        </div>
        <p className="text-sm font-medium text-green-700 mt-2">₹{item.price.toFixed(2)}</p>
      </div>

      {/* Right: Image with + button */}
      {item.image_url && (
        <div className="relative w-32 h-full shrink-0">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <QuickAddButton item ={item} restaurantId={restaurantId} />
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
