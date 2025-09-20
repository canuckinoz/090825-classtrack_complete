import React from 'react';
import { useUser } from '../../web/auth/useUser';
export default function AnalyticsView() {
  const user = useUser();
  if (user?.role === 'teacher') {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-light text-navy mb-2">Class Report</h2>
        <p className="text-slate-700">
          Peer comparison widgets are hidden for teacher role. Showing
          class-level insights only.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-2xl font-light text-navy mb-2">
        Reports & Analytics
      </h2>
      <p className="text-slate-700">
        Analytics components will live here (correlations, heatmaps,
        skill‑growth stories).
      </p>
    </div>
  );
}
