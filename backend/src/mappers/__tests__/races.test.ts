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
    expect(result[0].winner.name).toBe('Max Verstappen');
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
