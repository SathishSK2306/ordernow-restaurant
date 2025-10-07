import OrderConfirmationPage from "./pages/OrderConfirmationPage";

export const orderConfirmationRoutes = [
    {
        path: "restaurant/:restaurantId/order-confirmation/:orderId",
        element: <OrderConfirmationPage />,
        protected: false, // Assuming a public-facing order confirmation page
        label: "Order Confirmation"
    }
];