// --- DEV fetch patch (keep this) ---
// --- React entry ---
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

if (import.meta.env.DEV) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((rs) => rs.forEach((r) => r.unregister()));
  }
  caches?.keys?.().then((keys) => keys.forEach((k) => caches.delete(k)));

  const ORIG_FETCH = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    let url = typeof input === 'string' ? input : input?.url || '';
    if (url.startsWith('/api/') || url.startsWith('/auth/')) {
      url = `http://localhost:3005${url}`;
      input = typeof input === 'string' ? url : new Request(url, input);
      init = { credentials: 'include', ...init };
    }
    return ORIG_FETCH(input, init);
  };

  console.log('[dev] fetch patched: /api & /auth → http://localhost:3005');
}

const el = document.getElementById('root');
createRoot(el).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

console.log('[dev] React App rendered');
