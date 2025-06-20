// src/features/menu/pages/MenuPage.jsx
import {useState} from 'react';
import { useMenu } from '../hooks/useMenu';
import { useMenuHeader } from '../hooks/useMenuHeader';
import MenuSection from '../components/MenuSection';
import MenuItemDetail from '../components/MenuItemDetail';
import { useParams } from 'react-router-dom';
import { CartTotalsProvider } from '@/features/cart/context/cartTotals-context';
import { CartItemsProvider } from '@/features/cart/context/cartItems-context';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const { menuData, loading } = useMenu(restaurantId);
  useMenuHeader();

  const [selectedItem, setSelectedItem] = useState(null);

  const onItemClick = (item) => { setSelectedItem(item); };
  const onItemClose = () => { setSelectedItem(null); };

  if (loading) return <div className="text-center py-6 text-gray-600">Loading menu...</div>;
  if (!menuData) return <div className="text-center py-6 text-red-600">No menu data available.</div>;

  return (
    <>
      <div className="p-2 max-w-5xl mx-auto">
        {menuData.map(menu => (
          <MenuSection key={menu.id} menu={menu} onItemClick={onItemClick} />
        ))}
      </div>
      <CartItemsProvider restaurantId={restaurantId}>        
        <CartTotalsProvider restaurantId={restaurantId}>
          <MenuItemDetail item={selectedItem} onClose={onItemClose} restaurantId={restaurantId} />
        </CartTotalsProvider>
      </CartItemsProvider>
    </>
  );
};

export default MenuPage;