import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AppLayout({ children }) {
  async function logout() {
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {}
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-[#243b6b] text-white px-4 py-2 flex items-center gap-4">
        <strong>ClassTrack</strong>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'underline' : '')}
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
        <button
          onClick={logout}
          className="ml-auto bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
