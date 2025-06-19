// src/features/menu/routes.js
import MenuPage from './pages/MenuPage';

export const menuRoutes = [
  {
    path: '/restaurant/:restaurantId/menu',
    element: <MenuPage />,
    protected: false,
    label: 'Menu'
  }
  
];