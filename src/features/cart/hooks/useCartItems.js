// @/features/cart/hooks/useCartItems.js
import { useContext } from 'react';
import { CartItemsContext } from '../context/cartItems-context';

export const useCartItems = () => {
  const context = useContext(CartItemsContext);
  if (!context) throw new Error('useCartItems must be used within CartItemsProvider');
  return context;
};