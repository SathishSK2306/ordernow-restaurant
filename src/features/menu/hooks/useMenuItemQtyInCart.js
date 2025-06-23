
import { useQueryClient } from "@tanstack/react-query";

// Use cached cart data without forcing refetch
export function useMenuItemQtyInCart(restaurantId, menuItemId) {
  const queryClient = useQueryClient();

  const cartData = queryClient.getQueryData(['cart', restaurantId]);

  const quantity = cartData?.cart_items?.find(item => item.menu_item.id === menuItemId)?.quantity ?? 0;

  return quantity;
}