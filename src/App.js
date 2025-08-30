import React from 'react';
import { useStore } from "./state/useStore";
import { useGlobalContext } from './context/GlobalState';
import WeatherDashboard from "./features/weather";
import GardenDashboard from "./features/garden";
import ConstellationDashboard from "./features/constellation";
import AnalyticsView from "./features/analytics";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import QuickLog from "./features/quicklog/QuickLog";
import Login from './features/Auth/Login';

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
        <button className="font-semibold" onClick={()=>setView("weather")}>Dashboard</button>
        <button onClick={()=>setView("garden")}>Student Garden</button>
        <button onClick={()=>setView("constellation")}>Constellation</button>
        <button onClick={()=>setView("analytics")}>Reports</button>
        <div className="ml-auto">
          <Link to="/quick-log" className="bg-secondary-dark text-white px-3 py-1 rounded hover:bg-secondary">Quick Log</Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/garden" element={<GardenDashboard />} />
          <Route path="/constellation" element={<ConstellationDashboard />} />
          <Route path="/analytics" element={<AnalyticsView />} />
          <Route path="/quick-log" element={<QuickLog />} />
          <Route path="/" element={<Navigate to="/weather" replace />} />
        </Routes>
      </main>
    </div>
  );
}