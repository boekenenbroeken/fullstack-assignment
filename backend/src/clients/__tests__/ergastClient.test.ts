import { beforeEach, describe, expect, it, vi } from 'vitest';

import { redis } from '../../lib/redis';
import * as fetchUtils from '../../utils/fetchWithRetries';
import { fetchRaces, fetchSeasonChampion, fetchSeasons } from '../ergastClient';
import {
  mockChampionResponse,
  mockRacesResponse,
  mockSeasonsResponse,
} from './__mocks__/ergastClient.mock';

vi.mock('../../utils/fetchWithRetries');

const mockedFetchWithRetries = vi.mocked(fetchUtils.fetchWithRetries);

beforeEach(async () => {
  vi.clearAllMocks();
  await redis.flushall();
});

describe('ergastClient', () => {
  it('fetchSeasons success', async () => {
    mockedFetchWithRetries.mockResolvedValueOnce(mockSeasonsResponse.data);

    const result = await fetchSeasons();
    expect(result).toEqual(mockSeasonsResponse.data);
    expect(mockedFetchWithRetries).toHaveBeenCalled();
  });

  it('fetchSeasonChampion success', async () => {
    mockedFetchWithRetries.mockResolvedValueOnce(mockChampionResponse.data);

    const result = await fetchSeasonChampion(2021);
    expect(result).toEqual(mockChampionResponse.data);
    expect(mockedFetchWithRetries).toHaveBeenCalled();
  });

  it('fetchRaces success', async () => {
    mockedFetchWithRetries.mockResolvedValueOnce(mockRacesResponse.data);

    const result = await fetchRaces(2022);
    expect(result).toEqual(mockRacesResponse.data);
    expect(mockedFetchWithRetries).toHaveBeenCalled();
  });
});

describe('ergastClient errors', () => {
  it('fetchSeasons throws error on failure', async () => {
    mockedFetchWithRetries.mockRejectedValueOnce(new Error('network error'));

    await expect(fetchSeasons()).rejects.toThrow('❌ Failed to fetch seasons');
    expect(mockedFetchWithRetries).toHaveBeenCalled();
  });

  it('fetchSeasonChampion throws error on failure', async () => {
    mockedFetchWithRetries.mockRejectedValueOnce(new Error('timeout'));

    await expect(fetchSeasonChampion(2021)).rejects.toThrow(
      '❌ Failed to fetch champion for year 2021',
    );
    expect(mockedFetchWithRetries).toHaveBeenCalled();
  });

  it('fetchRaces throws error on failure', async () => {
    mockedFetchWithRetries.mockRejectedValueOnce(new Error('server error'));

    await expect(fetchRaces(2022)).rejects.toThrow('❌ Failed to fetch races for year 2022');
    expect(mockedFetchWithRetries).toHaveBeenCalled();
  });
});

describe('ergastClient cache hits', () => {
  it('should return seasons from cache and not call fetchWithRetries', async () => {
    await redis.set('seasons', JSON.stringify(mockSeasonsResponse.data));
    const result = await fetchSeasons();

    expect(result).toEqual(mockSeasonsResponse.data);
    expect(mockedFetchWithRetries).not.toHaveBeenCalled();
  });

  it('should return season champion from cache and not call fetchWithRetries', async () => {
    await redis.set('seasonChampion:2021', JSON.stringify(mockChampionResponse.data));
    const result = await fetchSeasonChampion(2021);

    expect(result).toEqual(mockChampionResponse.data);
    expect(mockedFetchWithRetries).not.toHaveBeenCalled();
  });

  it('should return races from cache and not call fetchWithRetries', async () => {
    await redis.set('races:2022', JSON.stringify(mockRacesResponse.data));
    const result = await fetchRaces(2022);

    expect(result).toEqual(mockRacesResponse.data);
    expect(mockedFetchWithRetries).not.toHaveBeenCalled();
  });
});
