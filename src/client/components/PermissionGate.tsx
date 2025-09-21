import React from 'react';
import { useAuth } from '../auth/AuthContext';

export function PermissionGate({
  need,
  children,
}: {
  need: string;
  children: React.ReactNode;
}) {
  const { hasPermission } = useAuth();
  if (!hasPermission(need)) return null;
  return <>{children}</>;
}
