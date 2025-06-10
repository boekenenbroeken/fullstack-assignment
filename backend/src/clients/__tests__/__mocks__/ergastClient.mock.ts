export const mockSeasonsResponse = {
  data: {
    MRData: {
      SeasonTable: {
        Seasons: [{ season: '2021' }],
      },
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const mockChampionResponse = {
  data: {
    MRData: {
      StandingsTable: {
        StandingsLists: [
          {
            season: '2021',
            round: '22',
            DriverStandings: [
              {
                position: '1',
                points: '395.5',
                Driver: { driverId: 'verstappen', givenName: 'Max', familyName: 'Verstappen' },
                Constructors: [{ constructorId: 'red_bull' }],
              },
            ],
          },
        ],
      },
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const mockRacesResponse = {
  data: {
    MRData: {
      RaceTable: {
        Races: [
          {
            raceName: 'Bahrain Grand Prix',
            round: '1',
            Results: [
              {
                position: '1',
                Driver: { driverId: 'leclerc', givenName: 'Charles', familyName: 'Leclerc' },
                Constructor: { constructorId: 'ferrari' },
              },
            ],
          },
        ],
      },
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
