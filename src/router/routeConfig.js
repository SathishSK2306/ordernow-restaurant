// src/router/routeConfig.js
import { menuRoutes } from '@features/menu/routes';
import { cartRoutes } from '@/features/cart/routes';
import { checkoutRoutes } from '@/features/checkout/routes';
import { authRoutes } from '@/features/auth/routes';
import { userAccountRoutes } from '@/features/user-account/routes';
import { orderConfirmationRoutes } from '@/features/order-confirmation/routes';
import { homeRoutes } from '@/features/home/routes';

export const allRoutes = [
  ...homeRoutes,
  ...authRoutes,
  ...menuRoutes,
  ...cartRoutes,
  ...checkoutRoutes,
  ...userAccountRoutes,
  ...orderConfirmationRoutes,
];