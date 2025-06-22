//src/features/cart/components/CartSummary.jsx
const CartSummary = ({subtotal=0}) => {
  const sgst = subtotal * 0.025;
  const cgst = subtotal * 0.025;
  const total = subtotal + sgst + cgst;

  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <h3 className="font-semibold text-lg mb-2">Summary</h3>
      <hr className="mb-2" />
      <div className="flex justify-between text-sm mb-1">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span>SGST (2.5%)</span>
        <span>₹{sgst.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>CGST (2.5%)</span>
        <span>₹{cgst.toFixed(2)}</span>
      </div>
      <hr className="mb-2" />
      <div className="flex justify-between font-medium text-base">
        <span>To Pay</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;