import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../state/useStore';

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const auth = useStore((s) => s.auth);
  const { user, ready, token } = auth;
  if (!ready) {
    return <div className="p-10 text-center text-slate-500">Loading…</div>;
  }
  const isAuthenticated = Boolean(token || user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
