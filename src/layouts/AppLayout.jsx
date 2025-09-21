import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useStore } from '../state/useStore';
import QuickLog from '../features/quicklog';
import ClassesBadge from '../features/classes/ClassesBadge';

export default function AppLayout() {
  const user = useStore((s) => s.auth.user);
  const userName = user?.name || user?.username || 'Guest';
  const bootstrap = useStore(
    (s) => (s.auth && s.auth.bootstrap) || s.bootstrapApp
  );

  useEffect(() => {
    if (typeof bootstrap === 'function') bootstrap();
  }, [bootstrap]);

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
          <ClassesBadge />
          <span className="opacity-90">{userName}</span>
          {process.env.NODE_ENV !== 'production' && <DevUserSwitcher />}
          <QuickLog.Trigger />
        </div>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

function DevUserSwitcher() {
  const roles = [
    { label: 'Teacher', value: 'teacher' },
    { label: 'Admin', value: 'admin' },
  ];
  const classIds = ['CLASS-3A', 'CLASS-5B'];

  function go(role, classId) {
    const params = new URLSearchParams({ role, classId, redirect: '/' });
    window.location.href = `/auth/login?${params.toString()}`;
  }

  return (
    <div className="flex items-center gap-2">
      <select
        aria-label="Dev role"
        className="text-navy rounded-md px-2 py-1"
        onChange={(e) => go(e.target.value, classIds[0])}
        defaultValue=""
      >
        <option value="" disabled>
          Dev: Switch User
        </option>
        {roles.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Dev class"
        className="text-navy rounded-md px-2 py-1"
        onChange={(e) => go(roles[0].value, e.target.value)}
        defaultValue={classIds[0]}
      >
        {classIds.map((cid) => (
          <option key={cid} value={cid}>
            {cid}
          </option>
        ))}
      </select>
    </div>
  );
}
