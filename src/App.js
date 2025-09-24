import React from 'react';
cursor/clean-update
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/Auth/Login';
import AppLayout from './layouts/AppLayout';
import PrivateRoute from './routes/PrivateRoute';
import WeatherDashboard from './features/weather';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<WeatherDashboard />} />
        <Route
          path="quick-log"
          element={
            <div className="rounded-xl bg-white p-6 shadow">Quick Log</div>
          }
        />
        <Route path="students/:id" element={<div>Student Detail</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useStore } from "./state/useStore";
import WeatherDashboard from "./features/weather";
import GardenDashboard from "./features/garden";
import ConstellationDashboard from "./features/constellation";
import AnalyticsView from "./features/analytics";
import QuickLog from "./features/quicklog";
import Login from './features/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

const AppLayout = ({ children }) => {
  const logout = useStore((state) => state.logout);
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface,#f7f9fc)]">
      <nav className="bg-navy text-white px-4 py-2 flex items-center gap-4">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Dashboard</NavLink>
        <NavLink to="/garden" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Student Garden</NavLink>
        <NavLink to="/constellation" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Constellation</NavLink>
        <NavLink to="/analytics" className={({ isActive }) => (isActive ? "font-semibold" : "")}>Reports</NavLink>
        <div className="ml-auto flex items-center gap-4">
          <QuickLog.Trigger />
          <button onClick={logout} className="text-sm">Logout</button>
        </div>
      </nav>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/dashboard" element={<WeatherDashboard />} />
                <Route path="/garden" element={<GardenDashboard />} />
                <Route path="/constellation" element={<ConstellationDashboard />} />
                <Route path="/analytics" element={<AnalyticsView />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
main
