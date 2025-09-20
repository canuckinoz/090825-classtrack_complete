import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalState';

/**
 * Login component for authenticating users.  It posts credentials to the
 * backend server and stores the returned token and user in the global state.
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await res.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
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
          <a
            className="mt-3 inline-block rounded-md bg-blue-600 text-white px-3 py-2"
            href="/dev-login?role=teacher&classId=CLASS-3A&redirect=/#/"
            title="Logs you in as a teacher for CLASS-3A"
          >
            Use demo teacher
          </a>
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
