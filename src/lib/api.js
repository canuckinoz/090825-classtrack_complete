export async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { Accept: 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const text = await res.text();
    throw new Error(
      `Expected JSON from ${path} but got ${ct}. First 120 chars: ${text.slice(
        0,
        120
      )}`
    );
  }
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) || {};
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}
