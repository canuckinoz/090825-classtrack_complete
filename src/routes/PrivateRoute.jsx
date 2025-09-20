import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../state/useStore';

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const user = useStore((s) => s.auth.user);
  const token = useStore((s) => s.auth.token);
  const isAuthenticated = Boolean(token || user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
