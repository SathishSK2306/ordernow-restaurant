import { useContext } from 'react';
import { CartTotalsContext } from '../context/cartTotals-context';

export const useCartTotals = () => {
  const context = useContext(CartTotalsContext);
  if (!context) throw new Error('useCartTotals must be used within CartTotalsProvider');
  const { subtotal, total_items, refreshTotals } = context;
  return { subtotal, total_items, refreshTotals };
};

export const useCartTotalsInternal = () => {
  const context = useContext(CartTotalsContext);
  if (!context) throw new Error('useCartTotalsInternal must be used within CartTotalsProvider');
  return context;
};
