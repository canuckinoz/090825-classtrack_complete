import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../state/useStore';

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const { user, ready } = useStore((s) => s.auth);
  if (!ready) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) return <div className="p-6 text-red-600">Access Denied</div>;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <div className="p-6 text-red-600">Access Denied</div>;
  }
  return children;
}
