// components/ProtectedRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('auth_token');
  if (!token || token.trim() === '') {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default ProtectedRoute;
