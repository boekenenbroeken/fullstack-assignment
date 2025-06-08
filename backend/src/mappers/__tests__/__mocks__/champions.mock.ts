import type { ChampionApiResponse } from '../../../types/ergast';

export const mockChampionApiResponse: ChampionApiResponse[] = [
  {
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
                    name: 'Mercedes',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
];

export const brokenMissingStandingsTable = [
  {
    MRData: {},
  },
] as any;

export const brokenMissingStandingsList: ChampionApiResponse[] = [
  {
    MRData: {
      StandingsTable: {
        season: '2021',
        StandingsLists: [],
      },
    },
  },
];

export const brokenMissingDriverStanding: ChampionApiResponse[] = [
  {
    MRData: {
      StandingsTable: {
        season: '2021',
        StandingsLists: [
          {
            DriverStandings: [],
          },
        ],
      },
    },
  },
];

export const brokenMissingDriver: ChampionApiResponse[] = [
  {
    MRData: {
      StandingsTable: {
        season: '2021',
        StandingsLists: [
          {
            DriverStandings: [
              {
                Driver: null as any,
                Constructors: [{ name: 'Mercedes' }],
              },
            ],
          },
        ],
      },
    },
  },
];

export const brokenMissingConstructor: ChampionApiResponse[] = [
  {
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
                Constructors: [],
              },
            ],
          },
        ],
      },
    },
  },
];
