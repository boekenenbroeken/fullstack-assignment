import { redis } from '../lib/redis';
import { ChampionApiResponse, RacesApiResponse, SeasonsApiResponse } from '../types/ergast';
import { fetchWithRetries } from '../utils/fetchWithRetries';
import { api } from './api';

const CACHE_TTL_SECONDS = 60 * 60;

export const fetchSeasons = async (): Promise<SeasonsApiResponse> => {
  const cacheKey = 'seasons';
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const url = '/seasons.json?limit=1000';
    const res = await fetchWithRetries<{ MRData: SeasonsApiResponse['MRData'] }>(
      api.defaults.baseURL + url,
    );

    await redis.set(cacheKey, JSON.stringify(res), 'EX', CACHE_TTL_SECONDS);

    return res;
  } catch (error) {
    console.error('❌ [fetchSeasons] Error fetching seasons:', error);
    throw new Error('❌ Failed to fetch seasons');
  }
};

export const fetchSeasonChampion = async (year: number): Promise<ChampionApiResponse> => {
  const cacheKey = `seasonChampion:${year}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const url = `/${year}/driverStandings/1.json`;
    const res = await fetchWithRetries<{ MRData: ChampionApiResponse['MRData'] }>(
      api.defaults.baseURL + url,
    );

    await redis.set(cacheKey, JSON.stringify(res), 'EX', CACHE_TTL_SECONDS);

    return res;
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
    const url = `/${year}/results/1.json`;
    const res = await fetchWithRetries<{ MRData: RacesApiResponse['MRData'] }>(
      api.defaults.baseURL + url,
    );

    await redis.set(cacheKey, JSON.stringify(res), 'EX', CACHE_TTL_SECONDS);

    return res;
  } catch (error) {
    console.error(`❌ [fetchRaces] Error fetching races for year ${year}:`, error);
    throw new Error(`❌ Failed to fetch races for year ${year}`);
  }
};
