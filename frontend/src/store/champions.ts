import { create } from 'zustand';
import type { Champion } from '../api';
import { fetchChampions } from '../api';

type ChampionsState = {
  data: Champion[];
  loading: boolean;
  error: boolean;
  fetch: () => Promise<void>;
  hydrate: () => void;
};

export const useChampionsStore = create<ChampionsState>((set) => ({
  data: [],
  loading: false,
  error: false,

  fetch: async () => {
    try {
      set({ loading: true, error: false });
      const data = await fetchChampions();
      set({ data, loading: false });
    } catch (e) {
      set({ error: true, loading: false });
    }
  },

  hydrate: () => {
    const { fetch } = useChampionsStore.getState();
    fetch();
  },
}));
