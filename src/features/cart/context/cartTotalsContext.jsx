//src/features/cart/context/cartTotals-context.jsx
import {createContext, useCallback, useState, useEffect} from 'react';
import { getCartTotals } from '@/features/cart/services/cartService';

const CartTotalsContext = createContext();
export { CartTotalsContext };

export function CartTotalsProvider({ restaurantId, children }) {
    const [totals, setTotals] = useState({subtotal:0, totalItems:0});
    
    const refreshTotals = useCallback (async () =>{
         try {
            const data = await getCartTotals(restaurantId);
            setTotals(data);
            } catch (err) {
            console.error('Failed to fetch cart totals:', err);
            }
        }, [restaurantId]);

    useEffect(() => {
        refreshTotals();
    }, [refreshTotals]);

    return (
        <CartTotalsContext.Provider value={{ ...totals, refreshTotals, setTotals }}>
        {children}
        </CartTotalsContext.Provider>
    );
}