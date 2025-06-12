import { request } from './client';
import type { Race } from './types/models';

export async function fetchRaces(season: string): Promise<Race[]> {
  return request<Race[]>(`/races/${season}`);
}
