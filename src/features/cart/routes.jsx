//src/features/cart/routes.jsx
import CartPage from "@/features/cart/pages/CartPage";
import { CartItemsProvider } from "@/features/cart/context/cartItems-context";
import { CartTotalsProvider } from "@/features/cart/context/cartTotals-context";

const CartRouteWrapper = () => {
  const restaurantId = "29d4b71d-f585-4a17-88dc-9e227b56d4f1"; // Get from params or context
  return (
    <CartItemsProvider restaurantId={restaurantId}>
      <CartTotalsProvider restaurantId={restaurantId}>
        <CartPage />
      </CartTotalsProvider>
    </CartItemsProvider>
  );
};

export const cartRoutes = [
  {
    path: "/restaurant/:restaurantId/cart",
    element: <CartRouteWrapper />,
    protected: false,
    label: "Cart",
  },
];
