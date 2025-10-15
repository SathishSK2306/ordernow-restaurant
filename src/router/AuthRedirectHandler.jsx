import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';

/**
 * This component handles redirecting the user after they log in.
 * It listens for the authentication state to change and then navigates
 * to the page the user was originally trying to access.
 */
function AuthRedirectHandler() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is now authenticated AND if there's a pending redirect location.
    if (isAuthenticated && location.state?.from) {
      const fromPath = location.state.from.pathname;
      const lastRestaurantId = localStorage.getItem('lastVisitedRestaurantId');
      
      let redirectTo = fromPath;

      if (redirectTo.includes(':restaurantId') && lastRestaurantId) {
        redirectTo = redirectTo.replace(':restaurantId', lastRestaurantId);
      } else if (redirectTo.includes(':restaurantId') && !lastRestaurantId) {
        redirectTo = '/'; // Fallback to home
      }

      // Perform the redirect and clear the state so this doesn't run again.
      navigate(redirectTo, { replace: true, state: {} });
    }
  }, [isAuthenticated, location, navigate]);

  return null; // This component renders nothing.
}

export default AuthRedirectHandler;