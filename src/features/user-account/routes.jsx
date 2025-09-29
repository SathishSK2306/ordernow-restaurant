import UserAccountPage from './pages/UserAccountPage';
import UserProfileEditPage from './pages/UserProfileEditPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserFavoritesPage from './pages/UserFavouritesPage';
import UserReviewsPage from './pages/UserReviewsPage';

export const userAccountRoutes = [
  {
    path: '/user-account',
    element: <UserAccountPage />,
    protected: true,
  },
  {
    path: '/user-account/profile',
    element: <UserProfileEditPage />,
    protected: true,
  },
  {
    path: '/user-account/orders',
    element: <UserOrdersPage />,
    protected: true,
  },
  {
    path: '/user-account/favorites',
    element: <UserFavoritesPage />,
    protected: true,
  },
  {
    path: '/user-account/reviews',
    element: <UserReviewsPage />,
    protected: true,
  },
];
