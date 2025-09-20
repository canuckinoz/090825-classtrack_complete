import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useStore } from '../state/useStore';
import QuickLog from '../features/quicklog';

export default function AppLayout() {
  const user = useStore((s) => s.auth.user);
  const userName = user?.name || user?.username || 'Guest';

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface,#f7f9fc)]">
      <header className="bg-navy text-white px-4 py-2 flex items-center gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'font-semibold underline' : 'font-semibold'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/quick-log"
          className={({ isActive }) => (isActive ? 'underline' : '')}
        >
          Quick Log
        </NavLink>
        <NavLink
          to="/students/CLASS-3A"
          className={({ isActive }) => (isActive ? 'underline' : '')}
        >
          Students
        </NavLink>
        <div className="ml-auto flex items-center gap-3">
          <span className="opacity-90">{userName}</span>
          <QuickLog.Trigger />
        </div>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
