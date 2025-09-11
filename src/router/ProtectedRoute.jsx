// // src/router/ProtectedRoute.jsx
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '@/providers/authContext';

const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return <div>Loading...</div>; // A global loading spinner can go here
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/auth" state={{ from: location }} replace />;
//   }

  return children;
};

export default ProtectedRoute;