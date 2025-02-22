import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  token: string;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
