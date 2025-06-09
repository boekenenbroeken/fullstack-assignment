import { RawRace } from '../../../types/ergast';

export const fullRaceData: RawRace[] = [
  {
    raceName: 'Australian Grand Prix',
    round: 1,
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

export const missingDriverData: RawRace[] = [
  {
    raceName: 'Bahrain Grand Prix',
    round: 2,
    Results: [{} as any],
  },
];

export const missingCircuitNameData: RawRace[] = [
  {
    raceName: 'Saudi Arabian Grand Prix',
    round: 3,
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

export const undefinedCircuitData: RawRace[] = [
  {
    raceName: 'Imola Grand Prix',
    round: 4,
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
