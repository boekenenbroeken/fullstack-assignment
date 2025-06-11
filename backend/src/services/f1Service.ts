import { fetchSeasonChampion, fetchRaces } from '../clients/ergastClient';
import { prisma } from '../lib/prisma';

import { championMapper, racesMapper } from '../mappers';

import { Champion, Race } from '../types/ergast';

export const getSeasonChampion = async (year: number): Promise<Champion> => {
  const data = await fetchSeasonChampion(year);

  return championMapper(data);
};

export const getAllChampions = async () => {
  const seasons = await prisma.season.findMany({
    include: {
      champion: {
        include: {
          driverSeasons: {
            include: {
              team: true,
            },
          },
        },
      },
    },
  });

  return seasons.map(({ id, champion, year }) => {
    const { driverSeasons, ...driver } = champion;
    const team = driverSeasons.find((driverSeason) => driverSeason.seasonId === id)?.team;

    return {
      season: year.toString(),
      driver,
      team,
    };
  });
};

export const getRaces = async (year: number): Promise<Race[]> => {
  const data = await fetchRaces(year);

  return racesMapper(data.MRData.RaceTable.Races);
};

export const getAllRaces = async (year: number) => {
  const season = await prisma.season.findUnique({
    where: { year },
    include: {
      races: {
        include: {
          winner: {
            include: {
              driverSeasons: {
                where: { season: { year } },
                include: {
                  team: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!season) {
    // TODO: fix
    throw new Error(`Season ${year} not found`);
  }

  return season.races.map(({ id, name, round, winner }) => ({
    id,
    name,
    round,
    winner: {
      id: winner.id,
      name: winner.name,
      nationality: winner.nationality,
    },
    team: winner.driverSeasons[0].team,
  }));
};
