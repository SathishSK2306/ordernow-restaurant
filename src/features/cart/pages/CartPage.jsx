// src/features/cart/pages/CartPage.jsx
import { useCartItems } from "@/features/cart/hooks/useCartItems";
import { useCartTotals } from "@/features/cart/hooks/useCartTotals";

const CartPage = () => {
  const { cartItems, loading, error } = useCartItems(); 
  const { subtotal, total_items } = useCartTotals();

  if (loading) return <div className="p-4 text-center text-gray-500">Loading cart...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Failed to load cart</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="mb-6">
        <p className="text-lg">Total Items: {total_items}</p>
        <p className="text-lg">Subtotal: ₹{subtotal.toFixed(2)}</p>
      </div>

      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-gray-800">{item.menu_item.name}</div>
              <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              <div className="text-sm text-gray-500">Price: ₹{item.price_at_added.toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
