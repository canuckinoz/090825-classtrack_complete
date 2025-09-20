export async function fetchMe() {
  const res = await fetch('/api/me', { credentials: 'include' });
  if (!res.ok) return null;
  try {
    const data = await res.json();
    return data.user ?? null;
  } catch (_e) {
    return null;
  }
}

export async function logout() {
  await fetch('/api/logout', { method: 'POST', credentials: 'include' });
}
