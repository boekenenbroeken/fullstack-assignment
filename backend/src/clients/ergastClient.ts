import { api } from './api';
import { redis } from '../lib/redis';

import { ChampionApiResponse, RacesApiResponse } from '../types/ergast';

export const fetchSeasons = async (): Promise<any> => {
  const cacheKey = 'seasons';
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const res = await api.get('/seasons.json?limit=1000');
    await redis.set(cacheKey, JSON.stringify(res.data), 'EX', 60 * 60); // 1 hour
    return res.data;
  } catch (error) {
    throw new Error('❌ Failed to fetch seasons');
  }
};

export const fetchSeasonChampion = async (year: number): Promise<ChampionApiResponse> => {
  const cacheKey = `seasonChampion:${year}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached) as ChampionApiResponse;
  }

  try {
    const { data } = await api.get(`/${year}/driverStandings/1.json`);
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 60 * 60); // cache for 1 hour
    return data as ChampionApiResponse;
  } catch (error) {
    console.error(`❌ [fetchSeasonChampion] Error fetching champion for year ${year}:`, error);
    throw new Error(`❌ Failed to fetch champion for year ${year}`);
  }
};

export const fetchRaces = async (year: number): Promise<RacesApiResponse> => {
  const cacheKey = `races:${year}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const { data } = await api.get(`/${year}/results/1.json`);
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 60 * 60); // cache for 1 hour
    return data;
  } catch (error) {
    console.error(`❌ [fetchRaces] Error fetching races for year ${year}:`, error);
    throw new Error(`❌ Failed to fetch races for year ${year}`);
  }
};
