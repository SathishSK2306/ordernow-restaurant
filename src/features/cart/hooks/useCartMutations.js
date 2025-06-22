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

  const optimisticUpdateCart = (updaterFn) => {
    const previousCart = queryClient.getQueryData(['cart', restaurantId]);
    queryClient.setQueryData(['cart', restaurantId], (old) => {
      if (!old) return old;
      const newCart = updaterFn(old);
      const subtotal = newCart.cart_items.reduce(
        (sum, item) => sum + item.quantity * item.price_at_added,
        0
      );
      const total_items = newCart.cart_items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return {
        ...newCart,
        totals: { subtotal, total_items },
      };
    });
    return previousCart;
  };

  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }) =>
      updateCartItem(cartItemId, { quantity }),

    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', restaurantId] });
      const previousCart = optimisticUpdateCart((old) => {
        const updatedItems = old.cart_items.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        );
        return { ...old, cart_items: updatedItems };
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
      const previousCart = optimisticUpdateCart((old) => {
        const updatedItems = old.cart_items.filter((item) => item.id !== cartItemId);
        return { ...old, cart_items: updatedItems };
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

    onMutate: async ({ item }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', restaurantId] });
      const previousCart = optimisticUpdateCart((old) => {
        const existing = old.cart_items.find((i) => i.menu_item.id === item.id);
        let updatedItems;
        if (existing) {
          updatedItems = old.cart_items.map((i) =>
            i.menu_item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          const newItem = {
            id: `temp-${Date.now()}`,
            cart_id: old.id,
            quantity: 1,
            price_at_added: item.price,
            special_instructions: null,
            menu_item: item,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          updatedItems = [...old.cart_items, newItem];
        }
        return { ...old, cart_items: updatedItems };
      });
      return { previousCart };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart', restaurantId], context.previousCart);
      }
    },

    onSettled: () => {
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

  const add = (item, note) => addItemMutation.mutate({ item, note });
  const remove = (item) => removeItemMutation.mutate(item.id);
  const clear = () => clearCartMutation.mutate();

  const increment = (item) => {
    updateQuantityMutation.mutate({
      cartItemId: item.id,
      quantity: item.quantity + 1,
    });
  };

  const decrement = (item) => {
    if (item.quantity === 1) {
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