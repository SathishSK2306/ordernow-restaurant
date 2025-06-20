import { useContext } from 'react';
import { CartTotalsContext } from '../context/cartTotals-context';

// Does not export setTotals, useCartTotalsInternal is used for that
// This hook is used to access the cart totals and the refresh function
// It does not export setTotals, useCartTotalsInternal is used for that
export const useCartTotals = () => {
  const context = useContext(CartTotalsContext);
  if (!context) throw new Error('useCartTotals must be used within CartTotalsProvider');
  const { subtotal, total_items, refreshTotals } = context;
  return { subtotal, total_items, refreshTotals };
};

// Also exports setTotals 
export const useCartTotalsInternal = () => {
  const context = useContext(CartTotalsContext);
  if (!context) throw new Error('useCartTotalsInternal must be used within CartTotalsProvider');
  return context;
};
