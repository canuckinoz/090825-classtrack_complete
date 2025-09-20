import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../state/useStore';

/**
 * Login component for authenticating users.  It posts credentials to the
 * backend server and stores the returned token and user in the store.
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const login = useStore((s) => s.auth.login);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ username, password });
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // In a later step, surface this via UI. For now, console.
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
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
                const res = await fetch(`${base}/auth/dev-login`, {
                  method: 'POST',
                  credentials: 'include',
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
