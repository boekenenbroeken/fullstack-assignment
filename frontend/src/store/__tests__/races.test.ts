import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useRacesStore } from 'store/races';
import { fetchRaces } from 'api/races';
import type { Race } from 'api/types/models';
import { act } from '@testing-library/react';
import type { Mock } from 'vitest';

vi.mock('api/races', () => ({
  fetchRaces: vi.fn(),
}));

const mockRaces: Race[] = [
  {
    name: 'Silverstone GP',
    round: '1',
    winner: { id: 'hamilton', name: 'Lewis Hamilton', nationality: 'British' },
    team: { id: 'mercedes', name: 'Mercedes' },
    id: 1,
    date: '2022-07-03',
    circuitName: 'Silverstone Circuit',
  },
];

describe('useRacesStore', () => {
  beforeEach(() => {
    useRacesStore.setState({
      data: [],
      loading: false,
      error: false,
      fetch: useRacesStore.getState().fetch,
      hydrate: useRacesStore.getState().hydrate,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const state = useRacesStore.getState();
    expect(state.data).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should fetch data successfully', async () => {
    (fetchRaces as Mock).mockResolvedValueOnce(mockRaces);

    await act(async () => {
      await useRacesStore.getState().fetch('2022');
    });

    const state = useRacesStore.getState();
    expect(state.data).toEqual(mockRaces);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should handle fetch error', async () => {
    (fetchRaces as Mock).mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      await useRacesStore.getState().fetch('2022');
    });

    const state = useRacesStore.getState();
    expect(state.data).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('hydrate should call fetch', () => {
    const fetchSpy = vi.spyOn(useRacesStore.getState(), 'fetch');
    useRacesStore.getState().hydrate('2022');
    expect(fetchSpy).toHaveBeenCalledWith('2022');
  });
});
