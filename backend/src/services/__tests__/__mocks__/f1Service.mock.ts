import type { Champion, ChampionApiResponse, Race } from '../../../types/ergast';
import type { Prisma } from '@prisma/client';

export const mockPrismaDriverSeason: Prisma.DriverSeasonGetPayload<{
  include: { season: true; driver: true; team: true };
}>[] = [
  {
    id: 123,
    seasonId: 1,
    driverId: 'hamilton',
    teamId: 'mercedes',
    season: { id: 1, year: 2021, championId: 'hamilton' },
    driver: { id: 'hamilton', name: 'Lewis Hamilton', nationality: 'British' },
    team: { id: 'mercedes', name: 'Mercedes' },
  },
];

export const mockChampionApiResponse: ChampionApiResponse = {
  MRData: {
    StandingsTable: {
      season: '2021',
      StandingsLists: [
        {
          DriverStandings: [
            {
              Driver: {
                driverId: 'hamilton',
                givenName: 'Lewis',
                familyName: 'Hamilton',
                nationality: 'British',
              },
              Constructors: [
                {
                  constructorId: 'mercedes',
                  name: 'Mercedes',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export const mockChampion: Champion = {
  season: '2021',
  driver: {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    nationality: 'British',
  },
  team: {
    id: 'mercedes',
    name: 'Mercedes',
  },
};

export const mockRaces: Race[] = [
  {
    id: 1,
    name: 'Mock GP',
    round: '1',
    winner: {
      id: 'verstappen',
      name: 'Max Verstappen',
      nationality: 'Dutch',
    },
    team: {
      id: 'red_bull',
      name: 'Red Bull',
    },
  },
];

export const mockSeasonFindUnique = {
  id: 1,
  year: 2021,
  championId: 'hamilton',
  races: [
    {
      id: 1,
      name: 'Mock GP',
      round: '1',
      seasonId: 2021,
      winnerId: 'verstappen',
      winner: {
        id: 'verstappen',
        name: 'Max Verstappen',
        nationality: 'Dutch',
        driverSeasons: [
          {
            id: 123,
            seasonId: 2021,
            driverId: 'verstappen',
            teamId: 'red_bull',
            team: { id: 'red_bull', name: 'Red Bull' },
          },
        ],
      },
    },
  ],
};
