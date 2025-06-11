export type RawDriver = {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
};

export type Driver = {
  id: string;
  name: string;
  nationality: string;
};

export type RawTeam = {
  constructorId: string;
  name: string;
};

export type Team = {
  id: string;
  name: string;
};

export type Champion = {
  season: string;
  driver: Driver;
  team: Team;
};

export type RawRace = {
  raceName: string;
  round: string;
  Results: {
    Driver: RawDriver;
    Constructor: RawTeam;
  }[];
};

export type Race = {
  name: string;
  round: string;
  winner: Driver;
  team: Team;
};

export type ChampionApiResponse = {
  MRData: {
    StandingsTable: {
      season: string;
      StandingsLists: {
        DriverStandings: {
          Driver: RawDriver;
          Constructors: RawTeam[];
        }[];
      }[];
    };
  };
};

export type RacesApiResponse = {
  MRData: {
    RaceTable: {
      Races: RawRace[];
    };
  };
};

export type SeasonsApiResponse = {
  MRData: {
    SeasonTable: {
      Seasons: Season[];
    };
  };
};

export type Season = {
  year: number;
  id: number;
  championId: string;
};
