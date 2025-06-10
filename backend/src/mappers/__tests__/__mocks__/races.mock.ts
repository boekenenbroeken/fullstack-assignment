import { RawRace } from '../../../types/ergast';

export const fullRaceData: RawRace[] = [
  {
    raceName: 'Australian Grand Prix',
    round: '1',
    Results: [
      {
        Driver: {
          driverId: 'max_verstappen',
          givenName: 'Max',
          familyName: 'Verstappen',
          nationality: 'Dutch',
        },
        Constructor: {
          constructorId: 'red_bull',
          name: 'Red Bull',
        },
      },
    ],
  },
];

export const missingDriverData: RawRace[] = [
  {
    raceName: 'Bahrain Grand Prix',
    round: '2',
    Results: [
      {
        // @ts-expect-error
        Driver: undefined,
        Constructor: {
          constructorId: 'red_bull',
          name: 'Red Bull',
        },
      },
    ],
  },
];

export const missingCircuitNameData: RawRace[] = [
  {
    raceName: 'Saudi Arabian Grand Prix',
    round: '3',
    Results: [
      {
        Driver: {
          driverId: 'lewis_hamilton',
          givenName: 'Lewis',
          familyName: 'Hamilton',
          nationality: 'British',
        },
        Constructor: {
          constructorId: 'mercedes',
          name: 'Mercedes',
        },
      },
    ],
  },
];

export const undefinedCircuitData: RawRace[] = [
  {
    raceName: 'Imola Grand Prix',
    round: '4',
    Results: [
      {
        Driver: {
          driverId: 'charles_leclerc',
          givenName: 'Charles',
          familyName: 'Leclerc',
          nationality: 'Monégasque',
        },
        Constructor: {
          constructorId: 'ferrari',
          name: 'Ferrari',
        },
      },
    ],
  },
];
