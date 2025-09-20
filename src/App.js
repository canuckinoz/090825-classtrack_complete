import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './state/useStore';
import Layout from './components/Layout';
import Login from './features/Auth/Login';
import WeatherDashboard from './features/weather';
import GardenDashboard from './features/garden';
import ConstellationDashboard from './features/constellation';
import AnalyticsView from './features/analytics';

const PrivateRoute = ({ children, scope }) => {
  const { user } = useStore();

  const hasScope = (requiredScope) => {
    if (user && user.scope) {
      return user.scope.includes('*') || user.scope.includes(requiredScope);
    }
    return false;
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (scope && !hasScope(scope)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default function App() {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <WeatherDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/garden"
        element={
          <PrivateRoute scope="garden">
            <Layout>
              <GardenDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/constellation"
        element={
          <PrivateRoute scope="constellation">
            <Layout>
              <ConstellationDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute scope="analytics">
            <Layout>
              <AnalyticsView />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
