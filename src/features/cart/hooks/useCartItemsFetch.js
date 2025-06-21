// src/features/cart/hooks/useCartItemsFetch.js
import { useState, useEffect, useCallback } from 'react';
import { getCartViewData } from '@/features/cart/services/cartService';

export const useCartItemsFetch = (restaurantId) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCartViewData(restaurantId);
      setCartItems(data.cart_items);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { cartItems, loading, error, fetchCart, setCartItems };
};