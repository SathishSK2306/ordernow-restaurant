// src/features/cart/components/CartActionButton.jsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartActionButton = ({ restaurantId }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(`/restaurant/${restaurantId}/checkout`);
  };

  return (
    <Button className="w-full text-base font-medium" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
};

export default CartActionButton;