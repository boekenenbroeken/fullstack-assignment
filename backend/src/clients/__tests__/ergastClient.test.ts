import { describe, it, expect, vi, beforeEach } from 'vitest';

import { fetchSeasons, fetchSeasonChampion, fetchRaces } from '../ergastClient';
import { api } from '../api';
import { redis } from '../../lib/redis';
import {
  mockSeasonsResponse,
  mockChampionResponse,
  mockRacesResponse,
} from './__mocks__/ergastClient.mock';

vi.mock('../api');

beforeEach(async () => {
  vi.clearAllMocks();

  await redis.flushall();
});

const mockGet = api.get as unknown as ReturnType<typeof vi.fn>;

describe('ergastClient', () => {
  it('fetchSeasons success', async () => {
    mockGet.mockResolvedValueOnce(mockSeasonsResponse);

    const result = await fetchSeasons();
    expect(result).toEqual(mockSeasonsResponse.data);
    expect(mockGet).toHaveBeenCalledWith('/seasons.json?limit=1000');
  });

  it('fetchSeasonChampion success', async () => {
    mockGet.mockResolvedValueOnce(mockChampionResponse);

    const result = await fetchSeasonChampion(2021);
    expect(result).toEqual(mockChampionResponse.data);
    expect(mockGet).toHaveBeenCalledWith('/2021/driverStandings/1.json');
  });

  it('fetchRaces success', async () => {
    mockGet.mockResolvedValueOnce(mockRacesResponse);

    const result = await fetchRaces(2022);
    expect(result).toEqual(mockRacesResponse.data);
    expect(mockGet).toHaveBeenCalledWith('/2022/results/1.json');
  });
});

describe('ergastClient errors', () => {
  it('fetchSeasons throws error on failure', async () => {
    mockGet.mockRejectedValueOnce(new Error('network error'));

    await expect(fetchSeasons()).rejects.toThrow('❌ Failed to fetch seasons');
    expect(mockGet).toHaveBeenCalledWith('/seasons.json?limit=1000');
  });

  it('fetchSeasonChampion throws error on failure', async () => {
    mockGet.mockRejectedValueOnce(new Error('timeout'));

    await expect(fetchSeasonChampion(2021)).rejects.toThrow(
      '❌ Failed to fetch champion for year 2021'
    );
    expect(mockGet).toHaveBeenCalledWith('/2021/driverStandings/1.json');
  });

  it('fetchRaces throws error on failure', async () => {
    mockGet.mockRejectedValueOnce(new Error('server error'));

    await expect(fetchRaces(2022)).rejects.toThrow('❌ Failed to fetch race winners for year 2022');
    expect(mockGet).toHaveBeenCalledWith('/2022/results/1.json');
  });
});
