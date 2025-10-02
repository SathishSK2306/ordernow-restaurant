// src/router/routeConfig.js
import { menuRoutes } from '@features/menu/routes';
import { cartRoutes } from '@/features/cart/routes';
import { checkoutRoutes } from '@/features/checkout/routes';
import { authRoutes } from '@/features/auth/routes';
import { userAccountRoutes } from '@/features/user-account/routes';

export const allRoutes = [
  ...authRoutes,
  ...menuRoutes,
  ...cartRoutes,
  ...checkoutRoutes,
  ...userAccountRoutes,
];