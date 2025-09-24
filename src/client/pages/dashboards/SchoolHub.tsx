import React from 'react';
import { PermissionGate } from '../../components/PermissionGate';
import { PERMISSIONS } from '../../../server/policies/permission.resolver';

export default function SchoolHub() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-emerald-700">School Hub</h1>
      <PermissionGate need={PERMISSIONS.VIEW_SCHOOL_AGGREGATE}>
        <div className="rounded-xl bg-white p-4 shadow">
          Supportive school aggregates and flagged students (no comparisons)
        </div>
      </PermissionGate>
    </div>
  );
}
