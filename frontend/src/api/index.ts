export type Champion = {
  season: string;
  driver: { id: string; name: string; nationality: string };
  constructorName: string;
};

export type Race = {
  id: number;
  raceName: string;
  date: string;
  round: string;
  circuitName: string;
  winner: { id: string; name: string; nationality: string };
};

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function fetchChampions(years?: string): Promise<Champion[]> {
  const q = years ? `?years=${years}` : '';
  const res = await fetch(`${BASE}/champions${q}`);
  if (!res.ok) throw new Error('Failed to load champions');
  return res.json();
}

export async function fetchRaces(season: string): Promise<Race[]> {
  const res = await fetch(`${BASE}/seed/${season}`);

  if (!res.ok) throw new Error('Failed to load races');
  return res.json();
}
