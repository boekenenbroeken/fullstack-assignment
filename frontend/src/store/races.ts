import { create } from 'zustand';
import type { Race } from 'api/types/models';
import { fetchRaces } from 'api/races';

type RacesState = {
  data: Race[];
  loading: boolean;
  error: boolean;
  fetch: (season: string) => Promise<void>;
  hydrate: (season: string) => void;
};

export const useRacesStore = create<RacesState>((set) => ({
  data: [],
  loading: false,
  error: false,

  fetch: async (season: string) => {
    try {
      set({ loading: true, error: false });
      const data = await fetchRaces(season);
      set({ data, loading: false });
    } catch {
      set({ error: true, loading: false });
    }
  },

  hydrate: (season: string) => {
    const { fetch } = useRacesStore.getState();
    fetch(season);
  },
}));
