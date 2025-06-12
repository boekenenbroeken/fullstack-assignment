import type { Champion } from './types/models';
import { request } from './client';

export async function fetchChampions(years?: string): Promise<Champion[]> {
  const q = years ? `?years=${years}` : '';

  return request<Champion[]>(`/champions${q}`);
}
