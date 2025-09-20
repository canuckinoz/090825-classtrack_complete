import { api } from '../../lib/api';

export async function fetchClasses() {
  const data = await api('/api/classes');
  return data.classes || [];
}
