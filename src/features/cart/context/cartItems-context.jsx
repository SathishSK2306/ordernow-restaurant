// src/features/cart/context/cartItems-context.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { getCartViewData } from '@/features/cart/services/cartService';

const CartItemsContext = createContext(null);
export { CartItemsContext }; 

export const CartItemsProvider = ({ restaurantId, children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartView = useCallback(async () => {
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
    fetchCartView();
  }, [fetchCartView]);

  return (
    <CartItemsContext.Provider value={{ cartItems, fetchCartView, loading, error }}>
      {children}
    </CartItemsContext.Provider>
  );
};


