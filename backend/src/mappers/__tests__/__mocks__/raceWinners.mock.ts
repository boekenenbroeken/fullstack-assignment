import { Race } from '../../../types/ergast';

export const fullRaceData: Race[] = [
  {
    raceName: 'Australian Grand Prix',
    date: '2022-03-20',
    round: '1',
    Circuit: {
      circuitName: 'Albert Park Grand Prix Circuit',
    },
    Results: [
      {
        Driver: {
          driverId: 'max_verstappen',
          givenName: 'Max',
          familyName: 'Verstappen',
          nationality: 'Dutch',
        },
      },
    ],
  },
];

export const missingDriverData: Race[] = [
  {
    raceName: 'Bahrain Grand Prix',
    date: '2022-03-27',
    round: '2',
    Circuit: {
      circuitName: 'Bahrain International Circuit',
    },
    Results: [{} as any],
  },
];

export const missingCircuitNameData: Race[] = [
  {
    raceName: 'Saudi Arabian Grand Prix',
    date: '2022-04-03',
    round: '3',
    Circuit: {} as any,
    Results: [
      {
        Driver: {
          driverId: 'lewis_hamilton',
          givenName: 'Lewis',
          familyName: 'Hamilton',
          nationality: 'British',
        },
      },
    ],
  },
];

export const undefinedCircuitData: Race[] = [
  {
    raceName: 'Imola Grand Prix',
    date: '2022-04-10',
    round: '4',
    Circuit: undefined as any,
    Results: [
      {
        Driver: {
          driverId: 'charles_leclerc',
          givenName: 'Charles',
          familyName: 'Leclerc',
          nationality: 'Monégasque',
        },
      },
    ],
  },
];
