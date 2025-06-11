import { describe, it, expect } from 'vitest';
import { racesMapper } from '../races';
import {
  fullRaceData,
  missingDriverData,
  missingCircuitNameData,
  undefinedCircuitData,
} from './__mocks__/races.mock';

describe('racesMapper', () => {
  it('should correctly map valid race data', () => {
    const result = racesMapper(fullRaceData);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Australian Grand Prix',
        round: '1',
        winner: {
          id: 'max_verstappen',
          name: 'Max Verstappen',
          nationality: 'Dutch',
        },
        team: {
          id: 'red_bull',
          name: 'Red Bull',
        },
      },
    ]);
  });

  it('should throw if Driver is missing', () => {
    expect(() => racesMapper(missingDriverData)).toThrow();
  });

  it('should map even if Circuit name is irrelevant (not used)', () => {
    const result = racesMapper(missingCircuitNameData);
    expect(result[0].name).toBe('Saudi Arabian Grand Prix');
  });

  it('should map even if Circuit is undefined (not used)', () => {
    const result = racesMapper(undefinedCircuitData);
    expect(result[0].name).toBe('Imola Grand Prix');
  });
});
