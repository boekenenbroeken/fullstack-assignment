import { RawRace } from '../../../types/ergast';

export const fullRaceData: RawRace[] = [
  {
    id: 1,
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
    id: 2,
    raceName: 'Bahrain Grand Prix',
    round: '2',
    Results: [
      {
        Driver: undefined as unknown as RawRace['Results'][0]['Driver'], // ✅ fully typed, no `any`
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
    id: 3,
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
    id: 4,
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
