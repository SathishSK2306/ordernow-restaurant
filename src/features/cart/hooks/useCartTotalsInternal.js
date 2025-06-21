import { useContext } from 'react';
import { CartTotalsContext } from '../context/cartTotalsContext';

// This hook is for read/write for mutations - includes setTotals to manually update totals
// setTotals should only be used internally by useCartMutations 
export const useCartTotalsInternal = () => {
  const context = useContext(CartTotalsContext);
  if (!context) throw new Error('useCartTotalsInternal must be used within CartTotalsProvider');
  return context;
};