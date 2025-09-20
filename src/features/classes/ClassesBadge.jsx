import React, { useEffect, useState } from 'react';
import { fetchClasses } from './api';

export default function ClassesBadge() {
  const [state, setState] = useState({ loading: true, error: '', count: 0 });

  useEffect(() => {
    let alive = true;
    fetchClasses()
      .then(
        (list) =>
          alive && setState({ loading: false, error: '', count: list.length })
      )
      .catch(
        (e) => alive && setState({ loading: false, error: e.message, count: 0 })
      );
    return () => {
      alive = false;
    };
  }, []);

  if (state.loading)
    return <span className="px-3 py-1 rounded bg-slate-200">Loading…</span>;
  if (state.error)
    return (
      <span className="px-3 py-1 rounded bg-rose-100 text-rose-700">
        Error loading classes
      </span>
    );
  return (
    <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800">
      {state.count} classes
    </span>
  );
}
