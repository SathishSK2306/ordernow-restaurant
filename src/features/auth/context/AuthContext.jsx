// src/features/auth/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../services/authService';
import { Toaster, toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use React Query to fetch the current user.
  // It will automatically handle caching and refetching.
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false, // Don't retry on failure, as it likely means the user is not logged in
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // A memoized function to handle logout logic
  const logout = useCallback(() => {
    // This function will be called by the useLogoutMutation on success
    setIsAuthenticated(false);
    // Remove the user data from the cache
    queryClient.setQueryData(['currentUser'], null);
    // Invalidate other queries that might depend on user auth
    queryClient.invalidateQueries(); 
    toast.success("You have been logged out.");
  }, [queryClient]);

  const value = {
    user,
    isAuthenticated,
    isLoading, // This is true during the initial user fetch
    isError,
    error,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
