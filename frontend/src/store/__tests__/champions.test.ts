import { act } from '@testing-library/react';
import { fetchChampions } from 'api/champions';
import type { Champion } from 'api/types/models';
import { useChampionsStore } from 'store/champions';
import type { Mock } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('api/champions', () => ({
  fetchChampions: vi.fn(),
}));

const mockChampions: Champion[] = [
  {
    season: '2022',
    driver: { id: 'hamilton', name: 'Lewis Hamilton', nationality: 'British' },
    team: { id: 'mercedes', name: 'Mercedes' },
  },
];

describe('useChampionsStore', () => {
  beforeEach(() => {
    useChampionsStore.setState({
      data: [],
      loading: false,
      error: false,
      fetch: useChampionsStore.getState().fetch,
      hydrate: useChampionsStore.getState().hydrate,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const state = useChampionsStore.getState();
    expect(state.data).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should fetch data successfully', async () => {
    (fetchChampions as Mock).mockResolvedValueOnce(mockChampions);

    await act(async () => {
      await useChampionsStore.getState().fetch();
    });

    const state = useChampionsStore.getState();
    expect(state.data).toEqual(mockChampions);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should handle fetch error', async () => {
    (fetchChampions as Mock).mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      await useChampionsStore.getState().fetch();
    });

    const state = useChampionsStore.getState();
    expect(state.data).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('hydrate should call fetch', () => {
    const fetchSpy = vi.spyOn(useChampionsStore.getState(), 'fetch');
    useChampionsStore.getState().hydrate();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should not fetch if already loading', async () => {
    useChampionsStore.setState({ loading: true });

    await act(async () => {
      await useChampionsStore.getState().fetch();
    });

    expect(fetchChampions).not.toHaveBeenCalled();
  });
});
