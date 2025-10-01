import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOtpPage from './pages/VerifyOtpPage';

export const authRoutes = [
  { path: '/login', element: <LoginPage />, protected: false },
  { path: '/signup', element: <SignUpPage />, protected: false },
  { path: '/verify-otp', element: <VerifyOtpPage />, protected: false },
];
