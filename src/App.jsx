import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './features/auth/Login';
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
        <Route
          path="dashboard"
          element={
            <PrivateRoute
              allowedRoles={['teacher', 'admin', 'leader', 'central']}
            >
              <WeatherDashboard />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
