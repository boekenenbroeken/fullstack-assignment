import { create } from 'zustand';
import type { Champion } from '../api';
import { fetchChampions } from '../api';

type ChampionsState = {
  data: Champion[];
  loading: boolean;
  error: boolean;
  fetch: (years?: string) => void;
};

export const useChampionsStore = create<ChampionsState>((set) => ({
  data: [],
  loading: false,
  error: false,
  fetch: async (years?: string) => {
    try {
      set({ loading: true, error: false });
      const data = await fetchChampions(years);
      set({ data, loading: false });
    } catch {
      set({ error: true, loading: false });
    }
  },
}));
