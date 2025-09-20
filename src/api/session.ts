function getApiOrigin(): string {
  // Prefer window override, then CRA env, then default
  const w: any = typeof window !== 'undefined' ? (window as any) : {};
  return (
    w.__API_ORIGIN__ ||
    process.env.REACT_APP_API_ORIGIN ||
    'http://localhost:3005'
  );
}

export function apiUrl(path: string): string {
  const base = getApiOrigin().replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export async function fetchMe() {
  const res = await fetch(apiUrl('/api/me'), { credentials: 'include' });
  if (!res.ok) return null;
  try {
    const data = await res.json();
    return data.user ?? null;
  } catch (_e) {
    return null;
  }
}

export async function logout() {
  await fetch(apiUrl('/api/logout'), {
    method: 'POST',
    credentials: 'include',
  });
}
