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

  it('should handle missing winner gracefully', () => {
    const result = racesMapper(missingDriverData);
    expect(result[0].winner).toEqual({
      id: 'unknown',
      name: '',
      nationality: 'Unknown',
    });
  });

  it('should fallback to "Unknown Circuit" if circuitName is missing', () => {
    const result = racesMapper(missingCircuitNameData);

    // @ts-expect-error
    expect(result[0].circuitName).toBe('Unknown Circuit');
  });

  it('should fallback to "Unknown Circuit" if Circuit is undefined', () => {
    const result = racesMapper(undefinedCircuitData);

    // @ts-expect-error
    expect(result[0].circuitName).toBe('Unknown Circuit');
  });
});
