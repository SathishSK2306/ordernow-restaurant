import {
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '@/features/cart/services/cartService';
import { useCartTotalsInternal } from './useCartTotalsInternal';

export function useCartMutations(restaurantId, { fetchCartView = null, setCartItems = null } = {}) {
  const { setTotals } = useCartTotalsInternal();

  const add = async (menuItem, note) => {
    await addItemToCart(restaurantId, menuItem, note);
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal + menuItem.price,
      total_items: prev.total_items + 1,
    }));
  };

  const updateQuantity = async (cartItemId, newQty, oldQty, itemPrice) => {
    await updateCartItem(cartItemId, { quantity: newQty });
    const diff = newQty - oldQty;
    setTotals(prev => ({
      ...prev,
      subtotal: prev.subtotal + diff * itemPrice,
      total_items: prev.total_items + diff,
    }));

    if (fetchCartView) await fetchCartView();
    else if (setCartItems) {
      setCartItems(prev =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item
        )
      );
    }
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
    else if (setCartItems) {
      setCartItems(prev => prev.filter((i) => i.id !== id));
    }
  };

  const clear = async () => {
    await clearCart(restaurantId);
    setTotals({ subtotal: 0, total_items: 0 });
    if (fetchCartView) await fetchCartView();
    else if (setCartItems) {
      setCartItems([]);
    }
  };

  const increment = async (item) => {
    const { id, quantity, price_at_added } = item;
    await updateQuantity(id, quantity + 1, quantity, price_at_added);
  };

  const decrement = async (item) => {
    const { id, quantity, price_at_added } = item;
    if (quantity === 1) {
      await remove(item);
    } else {
      await updateQuantity(id, quantity - 1, quantity, price_at_added);
    }
  };

  return { add, updateQuantity, remove, clear, increment, decrement };
}