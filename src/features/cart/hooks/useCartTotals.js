import { useContext } from 'react';
import { CartTotalsContext } from '../context/cartTotalsContext';

// Publick hook for accessing cart totals
// Does not include setTotals, only exposes subtotal, total_items, and refreshTotals
export const useCartTotals = () => {
  const context = useContext(CartTotalsContext);
  if (!context) throw new Error('useCartTotals must be used within CartTotalsProvider');
  const { subtotal, total_items, refreshTotals } = context;
  return { subtotal, total_items, refreshTotals }; // Does not include setTotals
};


