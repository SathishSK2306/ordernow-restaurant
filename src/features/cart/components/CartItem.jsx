// src/features/cart/components/CartItem.jsx
import React, { memo } from 'react';
import { QuantityCounterPill } from './QuantityCounter'

const CartItem = memo(({ item, restaurantId }) => {
  const { menu_item: menuItem, price_at_added } = item;


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
      <QuantityCounterPill quantity={item.quantity} item={item} restaurantId={restaurantId} />
    </div>
  );
});

export default CartItem;