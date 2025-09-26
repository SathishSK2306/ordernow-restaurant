import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyOtpPage from './pages/VerifyOtpPage';

export const authRoutes = [
  { path: '/login', element: <LoginPage />, protected: false },
  { path: '/signup', element: <SignupPage />, protected: false },
  { path: '/verify-otp', element: <VerifyOtpPage />, protected: false },
];
