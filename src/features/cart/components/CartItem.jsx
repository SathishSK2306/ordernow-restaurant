// src/features/cart/components/CartItem.jsx
import React, { memo } from 'react';
import { useCartMutations } from '../hooks/useCartMutations';
import { QuantityCounterPill } from './QuantityCounter'

const CartItem = memo(({ item, restaurantId }) => {
  const { menu_item: menuItem, quantity, price_at_added } = item;
  const { increment, decrement} = useCartMutations(restaurantId);

  const handleIncrement = () => {
    increment(item);    
  };

  const handleDecrement = () => {
    decrement(item);
  };

  return (
    <div className="flex border rounded-xl overflow-hidden items-center">
      <img
        src={menuItem.image_url}
        alt={menuItem.name}
        className="w-24 h-24 object-cover"
      />
      <div className="flex-1 p-4">
        <h4 className="font-medium text-gray-800">{menuItem.name}</h4>
        <p className="text-sm text-muted-foreground">₹{price_at_added.toFixed(2)}</p>
      </div>
      <QuantityCounterPill 
        quantity={quantity} 
        onIncrement={handleIncrement} 
        onDecrement={handleDecrement} 
      />
    </div>
  );
});

export default CartItem;