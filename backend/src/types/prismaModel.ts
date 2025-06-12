export type SeasonWithChampion = {
  id: number;
  year: number;
  champion: {
    id: string;
    name: string;
    nationality: string;
    driverSeasons: {
      seasonId: number;
      team: {
        id: string;
        name: string;
      };
    }[];
  };
};

export type DriverSeasonWithTeam = SeasonWithChampion['champion']['driverSeasons'][number];

export type SeasonWithRaces = {
  id: number;
  year: number;
  races: {
    id: number;
    name: string;
    round: string;
    winner: {
      id: string;
      name: string;
      nationality: string;
      driverSeasons: {
        team: {
          id: string;
          name: string;
        };
      }[];
    };
  }[];
};

export type RaceWithWinner = SeasonWithRaces['races'][number];
