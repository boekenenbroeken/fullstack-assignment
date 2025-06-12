import { request } from './client';
import type { Champion } from './types/models';

export async function fetchChampions(years?: string): Promise<Champion[]> {
  const q = years ? `?years=${years}` : '';

  return request<Champion[]>(`/champions${q}`);
}
