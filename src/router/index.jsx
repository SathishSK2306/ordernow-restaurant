// src/router/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import { allRoutes } from './routeConfig';
import AuthRedirectHandler from './AuthRedirectHandler';

const AppRouter = () => (
  <BrowserRouter>
    <AuthRedirectHandler />
    <Routes>
      <Route element={<AppLayout />}>
        {allRoutes.map(({ path, element, protected: isProtected }, index) => {
          const routeElement = isProtected ? (
            <ProtectedRoute>{element}</ProtectedRoute>
          ) : element;

          return <Route key={index} path={path} element={routeElement} />;
        })}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;