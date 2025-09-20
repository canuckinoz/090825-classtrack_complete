import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../state/useStore';

/**
 * Login component for authenticating users.  It posts credentials to the
 * server and, upon success, updates the global state with the received
 * user and token, then redirects to the dashboard.
 */
export default function Login() {
  const [username, setUsername] = useState('teacher');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();
  const { login, devLogin, error } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (process.env.NODE_ENV === 'development') {
      await devLogin(username);
    } else {
      await login(username, password);
    }
    if (!useStore.getState().error) {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
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
        <button type="submit" className="w-full bg-primary-dark text-white py-2 rounded hover:bg-primary text-base font-medium">
          Sign In
        </button>
      </form>
    </div>
  );
}