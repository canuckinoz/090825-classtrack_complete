import React from 'react';
import { PermissionGate } from '../../components/PermissionGate';
import { PERMISSIONS } from '../../../server/policies/permission.resolver';

export default function RegionAnalytics() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-purple-700">
        Region Analytics
      </h1>
      <PermissionGate need={PERMISSIONS.VIEW_REGION_AGGREGATE}>
        <div className="rounded-xl bg-white p-4 shadow">
          Network insights framed in growth/support language
        </div>
      </PermissionGate>
    </div>
  );
}
