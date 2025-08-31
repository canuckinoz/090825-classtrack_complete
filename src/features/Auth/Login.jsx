import React, { useState } from 'react';
import { useStore } from '../../state/useStore';

/**
 * Login component for authenticating users.  It uses the Zustand store
 * to handle the login logic and state updates.
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <label htmlFor="username-input" className="block text-sm font-medium mb-1">Username</label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="password-input" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
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