import { fetchRaces, fetchSeasonChampion } from '../clients/ergastClient';
import { prisma } from '../lib/prisma';
import { championMapper, racesMapper } from '../mappers';
import { Champion, Driver, Race, Team } from '../types/ergast';
import { DriverSeasonWithTeam, RaceWithWinner, SeasonWithChampion } from '../types/prismaModel';

export const getSeasonChampion = async (year: number): Promise<Champion> => {
  const data = await fetchSeasonChampion(year);

  return championMapper(data);
};

export const getAllChampions = async (): Promise<Champion[]> => {
  const seasons: SeasonWithChampion[] = await prisma.season.findMany({
    include: {
      champion: {
        include: {
          driverSeasons: {
            include: { team: true },
          },
        },
      },
    },
  });

  return seasons.map((season: SeasonWithChampion) => {
    const { id, year, champion } = season;
    const { driverSeasons, id: driverId, name, nationality } = champion;

    const teamEntity = driverSeasons.find((ds: DriverSeasonWithTeam) => ds.seasonId === id)?.team;

    const driver: Driver = { id: driverId, name, nationality };
    const team: Team = { id: teamEntity?.id ?? '', name: teamEntity?.name ?? '' };

    return { season: year.toString(), driver, team };
  });
};

export const getRaces = async (year: number): Promise<Race[]> => {
  const data = await fetchRaces(year);

  return racesMapper(data.MRData.RaceTable.Races);
};

export const getAllRaces = async (year: number): Promise<Race[]> => {
  const season = await prisma.season.findUnique({
    where: { year },
    include: {
      races: {
        include: {
          winner: {
            include: {
              driverSeasons: {
                where: { season: { year } },
                include: { team: true },
              },
            },
          },
        },
      },
    },
  });

  if (!season) {
    throw new Error(`Season ${year} not found`);
  }

  return season.races.map((race: RaceWithWinner) => ({
    id: race.id,
    name: race.name,
    round: race.round,
    winner: {
      id: race.winner.id,
      name: race.winner.name,
      nationality: race.winner.nationality,
    },
    team: race.winner.driverSeasons[0].team,
  }));
};
