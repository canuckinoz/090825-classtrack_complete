import React from 'react';
import { PermissionGate } from '../../components/PermissionGate';
import { PERMISSIONS } from '../../../server/policies/permission.resolver';

export default function ClassDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-blue-700">Class Dashboard</h1>
      <PermissionGate need={PERMISSIONS.VIEW_CLASS}>
        <div className="rounded-xl bg-white p-4 shadow">
          Weather/Garden (support-focused)
        </div>
      </PermissionGate>
    </div>
  );
}
