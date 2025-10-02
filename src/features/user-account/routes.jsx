import UserAccountPage from './pages/UserAccountPage';
import UserProfileEditPage from './pages/UserProfileEditPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserFavoritesPage from './pages/UserFavouritesPage';
import UserReviewsPage from './pages/UserReviewsPage';
import FAQPage from './pages/FAQPage';
import HelpPage from './pages/HelpPage';
import SendFeedBackPage from './pages/SendFeedBackPage';
import AboutPage from './pages/AboutPage';
import UserSettingsPage from './pages/UserSettingsPage';

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
  {
    path: '/user-account/settings',
    element: <UserSettingsPage />,
    protected: true,
  },
  {
    path: '/faq',
    element: <FAQPage />,
    protected: true,
  },
  {
    path: '/help',
    element: <HelpPage />,
    protected: true,
  },
  {
    path: '/send-feedback',
    element: <SendFeedBackPage />,
    protected: true,
  },
  {
    path: '/about',
    element: <AboutPage />,
    protected: true,
  },
];
