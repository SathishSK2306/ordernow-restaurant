//@/features/cart/hooks/useCartMutations.js
import {
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '@/features/menu/services/menuService';
import { useCartTotalsInternal } from './useCartTotals';
import { useCartItems } from './useCartItems'; // optional — only if used in CartPage

export function useCartMutations(restaurantId, { syncItems = false } = {}) {
  const { setTotals } = useCartTotalsInternal();
  const cartItemsContext = useCartItems(); // ✅ always called
  const fetchCartView = syncItems ? cartItemsContext.fetchCartView : null;

  const add = async (itemId, meta = {}, itemPrice = 0) => {
    await addItemToCart(restaurantId, { menu_item_id: itemId, ...meta });
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal + itemPrice,
      total_items: prev.total_items + 1,
    }));
  };

  const update = async (cartItemId, newQuantity, oldQuantity, itemPrice) => {
    await updateCartItem(cartItemId, { quantity: newQuantity });
    const diff = newQuantity - oldQuantity;
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal + diff * itemPrice,
      total_items: prev.total_items + diff,
    }));
    if (fetchCartView) await fetchCartView(); // ✅ safely used
  };

  const remove = async (cartItemId, itemQuantity, itemPrice) => {
    await removeCartItem(cartItemId);
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal - itemQuantity * itemPrice,
      total_items: prev.total_items - itemQuantity,
    }));
    if (fetchCartView) await fetchCartView();
  };

  const clear = async () => {
    await clearCart(restaurantId);
    setTotals({ subtotal: 0, total_items: 0 });
    if (fetchCartView) await fetchCartView();
  };

  return { add, update, remove, clear };
}

