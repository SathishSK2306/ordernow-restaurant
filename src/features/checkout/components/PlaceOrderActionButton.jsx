import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlaceOrderActionButton = ({ restaurantId }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Logic to place the order
    // After placing the order, navigate to the order confirmation page
    navigate(`/restaurant/${restaurantId}/order-confirmation/12345`); // Replace '12345' with actual order ID
  };

  return (
    <Button className="w-full text-base font-medium" onClick={handlePlaceOrder}>
      Place Order
    </Button>
  );
};

export default PlaceOrderActionButton;