cursor/clean-update
import React, { useState } from 'react';
import { useStore } from '../../state/useStore';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Login component for authenticating users.  It posts credentials to the
 * backend server and stores the returned token and user in the store.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../state/useStore';

/**
 * Login component for authenticating users.  It uses the Zustand store
 * for state management and authentication logic.
main
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
cursor/clean-update

  const { login, isAuthenticated, error } = useStore();
main
  const navigate = useNavigate();
  const authLogin = useStore((s) => s.auth.login);
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
cursor/clean-update
    try {
      await authLogin({ username, password });
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // In a later step, surface this via UI. For now, console.
      console.error(err);

    login(username, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
main
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        {process.env.NODE_ENV !== 'production' && (
          <button
            type="button"
            className="mt-3 inline-block rounded-md bg-blue-600 text-white px-3 py-2"
            title="Logs you in as a teacher for CLASS-3A"
            onClick={async () => {
              try {
                const base =
                  (typeof window !== 'undefined' &&
                    /** @type {any} */ (window).__API_ORIGIN__) ||
                  process.env.REACT_APP_API_ORIGIN ||
                  'http://localhost:3005';
                const res = await fetch(`${base}/auth/login`, {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: 'teacher@example.com',
                    password: 'password',
                  }),
                });
                const data = await res.json();
                if (data?.ok) {
                  navigate('/dashboard', { replace: true });
                }
              } catch (_e) {}
            }}
          >
            Use demo teacher
          </button>
        )}
        <button
          type="submit"
          className="w-full bg-primary-dark text-white py-2 rounded hover:bg-primary text-base font-medium"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
