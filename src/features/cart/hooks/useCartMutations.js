// src/features/cart/hooks/useCartMutations.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '@/features/cart/services/cartService';

export function useCartMutations(restaurantId) {
  const queryClient = useQueryClient();

  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }) =>
      updateCartItem(cartItemId, { quantity }),
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', restaurantId] });
      const previousCart = queryClient.getQueryData(['cart', restaurantId]);

      queryClient.setQueryData(['cart', restaurantId], (old) => {
        if (!old) return old;
        const newItems = old.cart_items.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        );
        const subtotal = newItems.reduce(
          (sum, item) => sum + item.quantity * item.price_at_added,
          0
        );
        const total_items = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return {
          ...old,
          cart_items: newItems,
          totals: { subtotal, total_items },
        };
      });

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', restaurantId], context.previousCart);
      }
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (cartItemId) => removeCartItem(cartItemId),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart', restaurantId] });
      const previousCart = queryClient.getQueryData(['cart', restaurantId]);

      queryClient.setQueryData(['cart', restaurantId], (old) => {
        if (!old) return old;
        const newItems = old.cart_items.filter((item) => item.id !== cartItemId);
        const subtotal = newItems.reduce(
          (sum, item) => sum + item.quantity * item.price_at_added,
          0
        );
        const total_items = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return {
          ...old,
          cart_items: newItems,
          totals: { subtotal, total_items },
        };
      });

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', restaurantId], context.previousCart);
      }
    },
  });

  const addItemMutation = useMutation({
    mutationFn: ({ item, note }) => addItemToCart(restaurantId, item, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', restaurantId] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => clearCart(restaurantId),
    onSuccess: () => {
      queryClient.setQueryData(['cart', restaurantId], {
        cart_items: [],
        totals: { subtotal: 0, total_items: 0 },
      });
    },
  });

  const remove = (item) => removeItemMutation.mutate(item.id);
  const add = (item, note) => addItemMutation.mutate({ item, note });
  const clear = () => clearCartMutation.mutate();

  const increment = (item) => {
    updateQuantityMutation.mutate({
      cartItemId: item.id,
      quantity: item.quantity + 1,
    });
  };

  const decrement = (item) => {
    if (item.quantity === 1) {
      console.log("Removing item as quantity is 1",item);

      remove(item);
    } else {
      updateQuantityMutation.mutate({
        cartItemId: item.id,
        quantity: item.quantity - 1,
      });
    }
  };


  return { add, increment, decrement, remove, clear };
}