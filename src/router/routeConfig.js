// src/router/routeConfig.js
import { menuRoutes } from '@features/menu/routes';
import { cartRoutes } from '@/features/cart/routes';
import { authRoutes } from '@/features/auth/routes';

export const allRoutes = [
  ...authRoutes,
  ...menuRoutes,
  ...cartRoutes,
];