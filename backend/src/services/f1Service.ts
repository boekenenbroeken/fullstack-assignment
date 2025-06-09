import { fetchSeasons, fetchSeasonChampion, fetchRaceWinners } from '../clients/ergastClient';
import { prisma } from '../lib/prisma';

import { championsMapper, driverMapper, raceWinnersMapper } from '../mappers';

import { Champion, MappedDriver, MappedRace } from '../types/ergast';

export const getSeasons = async (): Promise<{ season: string; url: string }[]> => {
  const data = await fetchSeasons();
  return data.MRData.SeasonTable.Seasons;
};

export const getSeasonChampion = async (year: string): Promise<MappedDriver | null> => {
  const data = await fetchSeasonChampion(year);
  const list = data.MRData.StandingsTable.StandingsLists;

  if (!list || list.length === 0) {
    throw new Error(`No standings found for year ${year}`);
  }

  return driverMapper(list[0].DriverStandings[0].Driver);
};

export const getAllChampions = async () => {
  const seasons = await prisma.season.findMany({
    include: { champion: true },
    orderBy: { year: 'asc' },
  });

  return seasons.map((s) => ({
    year: s.year.toString(),
    driver: s.champion.name.split(' ')[0], // or use full name
  }));
};

export const getRaceWinners = async (year: string): Promise<MappedRace[]> => {
  const data = await fetchRaceWinners(year);

  return raceWinnersMapper(data.MRData.RaceTable.Races);
};
