export type RawDriver = {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
};

export type MappedDriver = {
  id: string;
  name: string;
  nationality: string;
};

export type Champion = {
  season: string;
  driver: MappedDriver;
  constructorName: string;
};

export type Race = {
  raceName: string;
  date: string;
  round: string;
  Circuit: {
    circuitName: string;
  };
  Results: {
    Driver: RawDriver;
  }[];
};

export type MappedRace = {
  raceName: string;
  date: string;
  round: string;
  circuitName: string;
  winner: MappedDriver;
};

export type ChampionApiResponse = {
  MRData: {
    StandingsTable: {
      season: string;
      StandingsLists: {
        DriverStandings: {
          Driver: RawDriver;
          Constructors: {
            name: string;
          }[];
        }[];
      }[];
    };
  };
};

export type RaceWinnersApiResponse = {
  MRData: {
    RaceTable: {
      Races: Race[];
    };
  };
};
