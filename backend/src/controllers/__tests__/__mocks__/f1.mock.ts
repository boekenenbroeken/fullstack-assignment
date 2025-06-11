import { Champion, Race, Season } from '../../../types/ergast';

export const mockChampions: Champion[] = [
  {
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
  },
];

export const mockSeasonData: Season[] = [{ year: 2020, id: 1, championId: '1' }];

export const mockRaces: Race[] = [
  {
    id: 1,
    name: 'Mock Grand Prix',
    round: '1',
    winner: {
      id: 'driver1',
      name: 'Mock Driver',
      nationality: 'Mockland',
    },
    team: {
      id: 'team1',
      name: 'Mock Team',
    },
  },
];
