import { ChampionApiResponse, RawDriver } from '../../../types/ergast';

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

export const brokenMissingStandingsTable = {
  MRData: {},
} as ChampionApiResponse;

export const brokenMissingStandingsList: ChampionApiResponse = {
  MRData: {
    StandingsTable: {
      season: '2021',
      StandingsLists: [],
    },
  },
};

export const brokenMissingDriverStanding: ChampionApiResponse = {
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
};

export const brokenMissingDriver: ChampionApiResponse = {
  MRData: {
    StandingsTable: {
      season: '2021',
      StandingsLists: [
        {
          DriverStandings: [
            {
              Driver: null as unknown as RawDriver,
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

export const brokenMissingConstructor: ChampionApiResponse = {
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
};
