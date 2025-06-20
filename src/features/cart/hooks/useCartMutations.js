//@/features/cart/hooks/useCartMutations.js
import {
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '@/features/cart/services/cartService';
import { useCartTotalsInternal } from './useCartTotals';
import { useCartItems } from './useCartItems'; // optional — only if used in CartPage

export function useCartMutations(restaurantId, { syncItems = false } = {}) {
  const { setTotals } = useCartTotalsInternal();
  const cartItemsContext = useCartItems(); // ✅ always called
  const fetchCartView = syncItems ? cartItemsContext.fetchCartView : null;

  const add = async (menuItem, note) => {
    await addItemToCart(restaurantId, menuItem, note);
    // Manually update totals state
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal + menuItem.price,
      total_items: prev.total_items + 1,
    }));
  };

  const updateQuantity = async (cartItemId, newQuantity, oldQuantity, itemPrice) => {
    await updateCartItem(cartItemId, { quantity: newQuantity });
    const diff = newQuantity - oldQuantity;
    // Manually update totals state
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal + diff * itemPrice,
      total_items: prev.total_items + diff,
    }));
    if (fetchCartView) await fetchCartView(); // ✅ safely used
  };
  
  const remove = async (item) => {
    const { id, quantity, price_at_added } = item;
    await removeCartItem(id);
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal - quantity * price_at_added,
      total_items: prev.total_items - quantity,
    }));
    if (fetchCartView) await fetchCartView();
  };
  
  const clear = async () => {
    await clearCart(restaurantId);
    setTotals({ subtotal: 0, total_items: 0 });
    if (fetchCartView) await fetchCartView();
  };
  
  const increment = async (item) => {
    const { id, quantity, price_at_added } = item;
    await updateQuantity(id, quantity + 1, quantity, price_at_added);
  };
  
  const decrement = async (item) => {
    const { id, quantity, price_at_added } = item;
    if (quantity === 1) {
      await remove(id, 1, price_at_added);
    } else {
      await updateQuantity(id, quantity - 1, quantity, price_at_added);
    }
  };

  // Return all mutation functions
  return { add, updateQuantity, remove, clear, increment, decrement};
}

