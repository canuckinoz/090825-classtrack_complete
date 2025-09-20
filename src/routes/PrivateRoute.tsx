import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../state/useStore';

export default function PrivateRoute({
  children,
  roles,
}: PropsWithChildren<{ roles?: string[] }>) {
  const location = useLocation();
  const user = useStore((s) => s.auth.user);
  const token = useStore((s) => s.auth.token);
  const isAuthenticated = Boolean(token || user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles && roles.length && user && !roles.includes((user as any).role)) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p>You don’t have permission to view this page.</p>
      </div>
    );
  }
  return <>{children}</>;
}
