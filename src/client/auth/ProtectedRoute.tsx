import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission?: string;
}) {
  const { user, hasPermission } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate to="/login/teacher" replace state={{ from: location }} />;
  if (permission && !hasPermission(permission)) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You don’t have permission to view this page.</p>
      </div>
    );
  }
  return <>{children}</>;
}
