import { useState } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useMenuHeader } from '../hooks/useMenuHeader';
import MenuSection from '../components/MenuSection';
import MenuItemDetail from '../components/MenuItemDetail';
import MenuCategoryNavBar from '../components/MenuCategoryNavBar';
import { useParams } from 'react-router-dom';

import { HomeCarousel } from '@/features/carousel/components/HomeCarousel';
import { CollapsedCarousel } from '@/features/carousel/components/CollapsedCarousel';
import { useCarouselData } from '@/features/carousel/hooks/useCarouselData';

const RestaurantPage = () => {
    const { restaurantId } = useParams();
    const { data: menuData, isLoading: isLoadingMenu, isError: isErrorMenu } = useMenu(restaurantId);
    const { data: carouselData } = useCarouselData(restaurantId);
    
    useMenuHeader();

    const [selectedItem, setSelectedItem] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onItemClick = (item) => { setSelectedItem(item); };
    const onItemClose = () => { setSelectedItem(null); }; 

    const allCategories = menuData?.flatMap(menu => menu.categories);

    // Get the data for the collapsed view
    const welcomeData = carouselData?.welcome_data;

    if (isLoadingMenu) return <div className="text-center py-6 text-gray-600">Loading menu...</div>;
    if (isErrorMenu || !menuData) return <div className="text-center py-6 text-red-600">Failed to load menu data.</div>;

    return (
        <>
            {/* Conditionally render the carousel based on its state */}
            {isCollapsed && welcomeData ? (
                <CollapsedCarousel 
                    welcomeImageUrl={welcomeData.welcome_image_url} 
                    logoUrl={welcomeData.logo_url}
                    onExpand={() => setIsCollapsed(false)} 
                />
            ) : (
                <HomeCarousel onCollapse={() => setIsCollapsed(true)} />
            )}
            
            <MenuCategoryNavBar categories={allCategories} />
            
            <div className="p-2 max-w-5xl mx-auto">
                {menuData.map(menu => (
                    <MenuSection key={menu.id} menu={menu} onItemClick={onItemClick} />
                ))}
            </div>
            <MenuItemDetail item={selectedItem} onClose={onItemClose} restaurantId={restaurantId} />
        </>
    );
};

export default RestaurantPage;