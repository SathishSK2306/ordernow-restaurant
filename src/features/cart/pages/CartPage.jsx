// src/features/cart/pages/CartPage.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { useCartHeader } from '@/features/cart/hooks/useCartHeader';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import CartActionButton from '../components/CartActionButton';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

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
          <div className="p-4 max-w-3xl mx-auto space-y-6 flex flex-col min-h-[80vh]">
              {cartItems.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                      <ShoppingCart size={48} className="text-gray-400 mb-4" />
                      <h2 className="text-xl font-semibold">Your cart is empty</h2>
                      <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                      <Button onClick={handleMoreItems}>Start Shopping</Button>
                  </div>
              ) : (
                  <>
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
                  </>
              )}
          </div>
  );
};

export default CartPage;