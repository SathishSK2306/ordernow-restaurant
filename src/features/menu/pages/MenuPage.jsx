// src/features/menu/pages/MenuPage.jsx
import {useState } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useMenuHeader } from '../hooks/useMenuHeader';
import MenuSection from '../components/MenuSection';
import MenuItemDetail from '../components/MenuItemDetail';
import MenuCategoryNavBar from '../components/MenuCategoryNavBar';
import { useParams } from 'react-router-dom';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const { data: menuData, isLoading, isError } = useMenu(restaurantId);
  useMenuHeader();

  const [selectedItem, setSelectedItem] = useState(null);

  const onItemClick = (item) => { setSelectedItem(item); };
  const onItemClose = () => { setSelectedItem(null); };  

  
  const allCategories = menuData?.flatMap(menu => menu.categories);
  console.log('All Categories:', allCategories);

  if (isLoading) return <div className="text-center py-6 text-gray-600">Loading menu...</div>;
  if (isError || !menuData) return <div className="text-center py-6 text-red-600">Failed to load menu.</div>;
 
  return (
    <>
      {/* Sticky Horizontal Nav - for Categories */}
      <MenuCategoryNavBar categories={allCategories} />
      {/* Menu Section */}
      <div className="p-2 max-w-5xl mx-auto">
        {menuData.map(menu => (
          <MenuSection key={menu.id} menu={menu} onItemClick={onItemClick} />
        ))}
      </div>
        <MenuItemDetail item={selectedItem} onClose={onItemClose} restaurantId={restaurantId} />
    </>
  );
};

export default MenuPage;