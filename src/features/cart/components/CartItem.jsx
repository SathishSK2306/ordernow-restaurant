// src/features/cart/components/CartItem.jsx
import React, { memo } from 'react';
import { QuantityCounterPill } from './QuantityCounter'
import { useCartMutations } from '../hooks/useCartMutations';
import { ENV } from '@/config/env';
const imageBaseUrl = ENV.IMAGE_BASE_URL;

const CartItem = memo(({ item, restaurantId }) => {
  const { menu_item: menuItem, quantity, price_at_added } = item;
  const { increment, decrement} = useCartMutations(restaurantId);

  return (
    <div className="flex border rounded-xl overflow-hidden items-center">
      <img
        src={`${imageBaseUrl}/${menuItem.image_url}`}
        alt={menuItem.name}
        className="w-24 h-24 object-cover"
      />
      <div className="flex-1 p-4">
        <h4 className="font-medium text-gray-800">{menuItem.name}</h4>
        <p className="text-sm text-muted-foreground">₹{price_at_added.toFixed(2)}</p>
      </div>
      <QuantityCounterPill 
        quantity={quantity} 
        onIncrement={() => increment(item)}
        onDecrement={() => decrement(item)}
      />
    </div>
  );
});

export default CartItem;