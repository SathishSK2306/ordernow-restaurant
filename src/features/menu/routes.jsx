// src/features/menu/routes.js
//import MenuPage from './pages/MenuPage';
import RestaurantPage from './pages/RestaurantPage';

export const menuRoutes = [
  // {
  //   path: '/restaurant/:restaurantId/menu',
  //   element: <MenuPage />,
  //   protected: false,
  //   label: 'Menu'
  // }
  {
    path: '/restaurant/:restaurantId',
    element: <RestaurantPage />,
    protected: false, // Assuming a public-facing menu for guest users
    label: 'Restaurant Home'
  },
  
];