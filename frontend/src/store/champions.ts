import { fetchChampions } from 'api/champions';
import type { Champion } from 'api/types/models';
import { create } from 'zustand';

type ChampionsState = {
  data: Champion[];
  loading: boolean;
  error: boolean;
  fetch: () => Promise<void>;
  hydrate: () => void;
};

export const useChampionsStore = create<ChampionsState>((set, get) => ({
  data: [],
  loading: false,
  error: false,

  fetch: async () => {
    if (get().loading) return;

    set({ loading: true, error: false });

    try {
      const data = await fetchChampions();
      set({ data, loading: false });
    } catch (error) {
      console.error('Failed to fetch champions:', error);
      set({ error: true, loading: false });
    }
  },

  hydrate: () => {
    get().fetch();
  },
}));
