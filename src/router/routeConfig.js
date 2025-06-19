// src/router/routeConfig.js
import { menuRoutes } from '@features/menu/routes';
import { cartRoutes } from '@/features/cart/routes';

export const allRoutes = [
  ...menuRoutes,
  ...cartRoutes,
];