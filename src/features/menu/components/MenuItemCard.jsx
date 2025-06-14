// src/features/menu/components/MenuItemCard.jsx
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const MenuItemCard = ({ item }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between gap-4">
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        <p className="text-sm font-medium text-green-700">₹{item.price.toFixed(2)}</p>
      </div>
      {item.image_url && (
        <div className="flex flex-col items-center gap-1">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <Button size="sm" variant="outline" className="rounded-full p-1">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
