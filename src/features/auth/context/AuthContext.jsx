import { createContext, useContext, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    // Use React Query as the single source of truth for the user's session.
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false, // Don't retry on 401s
        refetchOnWindowFocus: false, // Keep the session stable during a user's visit
    });

    // A memoized function to handle logout logic
    const logout = useCallback(() => {
        // Remove the user data from the cache. This will cause `user` to become null.
        queryClient.setQueryData(['currentUser'], null);
        // Invalidate other queries that might depend on user auth
        queryClient.invalidateQueries({
            refetchType: 'none', // Do not refetch, just mark as stale
        });
        toast.success("You have been logged out.");
    }, [queryClient]);

    // The context value is now simpler and more reliable.
    const value = {
        user,
        isAuthenticated: !!user, 
        isLoading, // This is true only during the initial user fetch.
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

