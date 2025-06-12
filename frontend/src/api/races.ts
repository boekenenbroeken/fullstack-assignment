import type { Race } from './types/models';
import { request } from './client';

export async function fetchRaces(season: string): Promise<Race[]> {
  return request<Race[]>(`/races/${season}`);
}
