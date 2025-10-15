// src/features/auth/hooks/useAuthMutations.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { requestOtp, verifyOtp, logout as logoutService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export function useRequestOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Current location state at request otp:", location.state);

  return useMutation({
    mutationFn: requestOtp,
    onSuccess: (data, variables) => {
      toast.success(data.message || 'OTP has been sent.');
      // Navigate to the verification page with necessary state
      navigate('/verify-otp', {
        replace: true,
        state: {
          ...location.state, // Preserve any existing state
          contact: variables.contact,
          channel: variables.channel,
          purpose: variables.purpose,
          otp_id: data.otp_id,
        },
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to send OTP. Please try again.');
    },
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success(data.message || 'Verification successful!');

      // If you are using the checkout session, store the ID
      if (data.checkout_session_id) {
        sessionStorage.setItem('checkout_session_id', data.checkout_session_id);
      }
      
      // That's it! Just invalidate the query.
      // The new component we're about to create will handle the redirect.
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'OTP verification failed. Please try again.');
    },
  });
}

export function useLogout() {
    const navigate = useNavigate();
    const { logout: contextLogout } = useAuth(); // Get the context logout function

    return useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            contextLogout(); // Update the context state
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            // Even if the API call fails, force a client-side logout
            console.error("Logout API call failed", error);
            toast.error("Logout failed, but you've been logged out from this device.");
            contextLogout();
            navigate('/login', { replace: true });
        },
    });
}
