// src/router/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { allRoutes } from './routeConfig';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {allRoutes.map(({ path, element, protected: isProtected }, index) => {
        const routeElement = isProtected ? (
          <ProtectedRoute>{element}</ProtectedRoute>
        ) : (
          element
        );

        return <Route key={index} path={path} element={routeElement} />;
      })}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;