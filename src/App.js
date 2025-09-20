import React from 'react';
import { useStore } from './state/useStore';
import { useGlobalContext } from './context/GlobalState';
import WeatherDashboard from './features/weather';
import GardenDashboard from './features/garden';
import ConstellationDashboard from './features/constellation';
import AnalyticsView from './features/analytics';
import ABCTracker from './features/abc';
import QuickLog from './features/quicklog';
import Login from './features/Auth/Login';
import RequireTeacherClass from './web/auth/RequireTeacherClass';

export default function App() {
  const { currentView, setView } = useStore();
  // For now, we'll keep the old auth logic until we migrate it to Zustand
  const { state } = useGlobalContext();
  const isAuthenticated = !!state.token;

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface,#f7f9fc)]">
      {/* Top Nav — keeps ≤2 clicks to log */}
      <nav className="bg-navy text-white px-4 py-2 flex items-center gap-4">
        <button className="font-semibold" onClick={() => setView('weather')}>
          Dashboard
        </button>
        <button onClick={() => setView('garden')}>Student Garden</button>
        <button onClick={() => setView('constellation')}>Constellation</button>
        <button onClick={() => setView('analytics')}>Reports</button>
        <button onClick={() => setView('quicklog')}>Quick Log</button>
        <button onClick={() => setView('abc')}>ABC Tracker</button>
        <div className="ml-auto">
          <QuickLog.Trigger />
          {/* one‑click log from anywhere */}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-4">
        {currentView === 'weather' && (
          <RequireTeacherClass classId={'CLASS-3A'}>
            <WeatherDashboard />
          </RequireTeacherClass>
        )}
        {currentView === 'garden' && <GardenDashboard />}
        {currentView === 'constellation' && <ConstellationDashboard />}
        {currentView === 'analytics' && <AnalyticsView />}
        {currentView === 'quicklog' && (
          <div className="rounded-xl bg-white p-6 shadow">Quick Log</div>
        )}
        {currentView === 'abc' && <ABCTracker />}
      </main>

      {/* Floating QuickLog Trigger */}
      <div className="fixed right-4 bottom-4 z-40">
        <QuickLog.Trigger />
      </div>
    </div>
  );
}
