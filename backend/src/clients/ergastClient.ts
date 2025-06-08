import { api } from './api';

import { ChampionApiResponse, RaceWinnersApiResponse } from '../types/ergast';

export const fetchSeasons = async (): Promise<any> => {
  try {
    const { data } = await api.get('/seasons.json?limit=1000');

    return data;
  } catch (error) {
    console.error('❌ [fetchSeasons] Error fetching seasons:', error);
    throw new Error('❌ Failed to fetch seasons');
  }
};

export const fetchSeasonChampion = async (year: string): Promise<ChampionApiResponse> => {
  try {
    const { data } = await api.get(`/${year}/driverStandings/1.json`);

    return data;
  } catch (error) {
    console.error(`❌ [fetchSeasonChampion] Error fetching champion for year ${year}:`, error);
    throw new Error(`❌ Failed to fetch champion for year ${year}`);
  }
};

export const fetchRaceWinners = async (year: string): Promise<RaceWinnersApiResponse> => {
  try {
    const { data } = await api.get(`/${year}/results/1.json`);

    return data;
  } catch (error) {
    console.error(`❌ [fetchSeasonChampion] Error fetching race winners for year ${year}:`, error);
    throw new Error(`❌ Failed to fetch race winners for year ${year}`);
  }
};
