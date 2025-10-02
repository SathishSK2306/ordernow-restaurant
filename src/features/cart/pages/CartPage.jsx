// src/features/cart/pages/CartPage.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { useCartHeader } from '@/features/cart/hooks/useCartHeader';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import CartActionButton from '../components/CartActionButton';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/useCart';

const CartPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  useCartHeader();
  
  const { data: cartViewData, isLoading, error } = useCart(restaurantId);
  const cartItems = cartViewData?.cart_items || [];

  const handleMoreItems = () => navigate(`/restaurant/${restaurantId}`);

  if (isLoading) return <div className="text-center p-6">Loading cart...</div>;
  if (error) return <div className="text-center p-6 text-red-600">Failed to load cart</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            restaurantId={restaurantId}
          />
        ))}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleMoreItems}>
            + Add more items
          </Button>
        </div>
      </div>
      <CartSummary subtotal={cartViewData.totals.subtotal} />
      <CartActionButton restaurantId={restaurantId} />
    </div>
  );
};

export default CartPage;