import CheckoutPage from "./pages/CheckoutPage";

export const checkoutRoutes = [
  {
    path: "/restaurant/:restaurantId/checkout",
    element: <CheckoutPage />,
    protected: true,
  },
];
