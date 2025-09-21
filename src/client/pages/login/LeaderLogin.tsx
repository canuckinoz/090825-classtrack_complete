import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';

function decodeJwt(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export default function LeaderLogin() {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('principal-alpha@example.com');
  const [password, setPassword] = useState('password');
  const [err, setErr] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/api/auth/login/leader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Login failed');
      const claims = decodeJwt(data.accessToken);
      if (claims) setAuth(claims, data.accessToken);
      window.location.assign(data.landing || '/');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-emerald-50">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl p-6 w-[min(420px,92vw)] shadow"
      >
        <h1 className="text-2xl font-semibold text-emerald-700 mb-4">
          Leader sign in
        </h1>
        {err && (
          <div className="mb-3 text-rose-700 bg-rose-100 rounded px-3 py-2">
            {err}
          </div>
        )}
        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded px-3 py-2">
          Sign in
        </button>
      </form>
    </div>
  );
}
