import React, { useEffect, useState } from 'react';

export default function WeatherDashboard() {
  const [state, setState] = useState({
    ok: false,
    loading: true,
    error: null,
    classes: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/classes', { credentials: 'include' });
        const ct = r.headers.get('content-type') || '';
        if (!ct.includes('application/json'))
          throw new Error(`Expected JSON, got ${ct}`);
        const data = await r.json();
        setState({
          ok: true,
          loading: false,
          error: null,
          classes: data.classes ?? [],
        });
      } catch (err) {
        setState({
          ok: false,
          loading: false,
          error: String(err),
          classes: [],
        });
      }
    })();
  }, []);

  if (state.loading) return <p>Loading…</p>;
  if (state.error)
    return (
      <p style={{ color: '#c00' }}>Error loading classes: {state.error}</p>
    );

  return (
    <section>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        Dashboard
      </h1>
      <p style={{ marginBottom: 12 }}>Classes loaded: {state.classes.length}</p>
      <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
        {state.classes.map((c) => (
          <li key={c.id}>
            {c.name} <small style={{ opacity: 0.6 }}>({c.id})</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
