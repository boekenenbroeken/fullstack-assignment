export const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error('Network error');

  return res.json();
}
