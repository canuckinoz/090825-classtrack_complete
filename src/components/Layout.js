import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../state/useStore';
import QuickLog from '../features/quicklog';

const Layout = ({ children }) => {
  const { user, logout } = useStore();

  const hasScope = (scope) => {
    if (user && user.scope) {
      return user.scope.includes('*') || user.scope.includes(scope);
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface,#f7f9fc)]">
      {/* Top Nav — keeps ≤2 clicks to log */}
      <nav className="bg-navy text-white px-4 py-2 flex items-center gap-4">
        {hasScope('weather') && <Link to="/" className="font-semibold">Dashboard</Link>}
        {hasScope('garden') && <Link to="/garden">Student Garden</Link>}
        {hasScope('constellation') && <Link to="/constellation">Constellation</Link>}
        {hasScope('analytics') && <Link to="/reports">Reports</Link>}
        <div className="ml-auto flex items-center gap-4">
          <QuickLog.Trigger />{/* one‑click log from anywhere */}
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Floating QuickLog Trigger */}
      <div className="fixed right-4 bottom-4 z-40">
        <QuickLog.Trigger />
      </div>
    </div>
  );
};

export default Layout;
