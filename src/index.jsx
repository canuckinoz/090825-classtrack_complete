import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Assuming your main App component is in App.jsx
import { useStore as useStoreZ } from './state/useStore';
import './index.css'; // Assuming you have a main CSS file

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  // Dev guard: if something navigates to /build, snap back to /
  if (import.meta.env.DEV && window.location.pathname.startsWith('/build')) {
    window.history.replaceState(null, '', '/');
  }
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  // Disable SW in dev to avoid proxy/caching interference
  if (import.meta.env.MODE !== 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((rs) => rs.forEach((r) => r.unregister()))
      .catch(() => {});
  }

  // In static-dev (serve -s dist on 5173), ensure /api and /auth go to API 3005
  try {
    const w = window;
    if (
      w.location.hostname === 'localhost' &&
      w.location.port === '5173' &&
      !w.__API_ORIGIN__
    ) {
      w.__API_ORIGIN__ = 'http://localhost:3005';
    }
    if (w.__API_ORIGIN__ && typeof w.fetch === 'function') {
      const originalFetch = w.fetch.bind(w);
      w.fetch = (input, init) => {
        let url = input;
        const isRel =
          typeof url === 'string' &&
          (url.startsWith('/api') || url.startsWith('/auth'));
        if (isRel) {
          const base = String(w.__API_ORIGIN__ || '').replace(/\/$/, '');
          url = base + url;
          const opts = init ? { ...init } : {};
          if (!opts.credentials) opts.credentials = 'include';
          return originalFetch(url, opts);
        }
        return originalFetch(input, init);
      };
    }
  } catch (_e) {}

  // Dev-only helper to force a session rehydrate without a full reload
  if (import.meta.env.DEV) {
    // @ts-ignore
    window.refreshAuth = () => useStoreZ.getState().auth.bootstrap?.();
    // eslint-disable-next-line no-console
    console.log(
      '%cDev helper available: window.refreshAuth()',
      'color:#0ea5e9'
    );
  }
} else {
  console.error(
    "Failed to find the root element. Please ensure your HTML has an element with id='root'."
  );
}
