// src/features/cart/pages/CartPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useCartItems } from "@/features/cart/hooks/useCartItems";
import { useCartHeader } from "@/features/cart/hooks/useCartHeader";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartActionButton from "../components/CartActionButton";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { cartItems, loading, error } = useCartItems();
  useCartHeader();
  const navigate = useNavigate();
  const {restaurantId } = useParams();

  const handleMoreItems = () => {
    navigate(`/restaurant/${restaurantId}/menu`);
  };

  if (loading) return <div className="text-center p-6">Loading cart...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Failed to load cart</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleMoreItems}>+ Add more items</Button>
        </div>
      </div>

      <CartSummary />

      <CartActionButton />
    </div>
  );
};

export default CartPage;