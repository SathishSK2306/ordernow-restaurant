// src/features/cart/components/CartItem.jsx
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { useCartMutations } from '../hooks/useCartMutations';

const CartItem = memo(({ item, restaurantId, sessionId }) => {
  const { menu_item: menuItem, quantity, price_at_added } = item;
  const { increment, decrement} = useCartMutations(restaurantId, sessionId);

  const handleIncrement = () => {
    increment(item);    
  };

  const handleDecrement = () => {
    decrement(item);
  };

  return (
    <div className="flex border rounded-xl overflow-hidden">
      <img
        src={menuItem.image_url}
        alt={menuItem.name}
        className="w-24 h-24 object-cover"
      />
      <div className="flex-1 p-4">
        <h4 className="font-medium text-gray-800">{menuItem.name}</h4>
        <p className="text-sm text-muted-foreground">₹{price_at_added.toFixed(2)}</p>
      </div>
      <div className="flex items-center px-4 space-x-2">
        <Button size="sm" variant="outline" onClick={handleDecrement}>-</Button>
        <span>{quantity}</span>
        <Button size="sm" variant="outline" onClick={handleIncrement}>+</Button>
      </div>
    </div>
  );
});

export default CartItem;