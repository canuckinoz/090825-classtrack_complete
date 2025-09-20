import React from 'react';
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
