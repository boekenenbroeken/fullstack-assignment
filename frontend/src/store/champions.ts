import { create } from 'zustand';

import type { Champion } from '../api';
import { fetchChampions } from '../api';

type ChampionsActions = {
  fetch: (years?: string) => Promise<void>;
};

type ChampionsState = {
  data: Champion[];
  loading: boolean;
  error: boolean;
} & ChampionsActions;

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
