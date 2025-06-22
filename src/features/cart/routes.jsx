//src/features/cart/routes.jsx
import CartPage from "@/features/cart/pages/CartPage";

export const cartRoutes = [
  {
    path: "/restaurant/:restaurantId/cart",
    element: <CartPage />,
    protected: false,
    label: "Cart",
  },
];
