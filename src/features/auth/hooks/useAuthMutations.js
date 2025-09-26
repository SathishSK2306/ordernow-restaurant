// src/features/auth/hooks/useAuthMutations.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { requestOtp, verifyOtp, logout as logoutService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export function useRequestOtp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: requestOtp,
    onSuccess: (data, variables) => {
      toast.success(data.message || 'OTP has been sent.');
      // Navigate to the verification page with necessary state
      navigate('/verify-otp', {
        state: {
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success(data.message || 'Verification successful!');
      // Invalidate the currentUser query to trigger a refetch with the new user data
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Navigate to the main page or intended destination after login
      //navigate('/', { replace: true });
      //navigate(-1); // Go back to the previous page
      navigate('/restaurant/29d4b71d-f585-4a17-88dc-9e227b56d4f1/', { replace: true });
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
