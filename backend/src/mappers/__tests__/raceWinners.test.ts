import { describe, it, expect } from 'vitest';

import { raceWinnersMapper } from '../raceWinners';
import {
  fullRaceData,
  missingDriverData,
  missingCircuitNameData,
  undefinedCircuitData,
} from './__mocks__/raceWinners.mock';

describe('raceWinnersMapper', () => {
  it('should correctly map valid race data', () => {
    const result = raceWinnersMapper(fullRaceData);
    expect(result[0].winner.name).toBe('Max Verstappen');
  });

  it('should handle missing winner gracefully', () => {
    const result = raceWinnersMapper(missingDriverData);
    expect(result[0].winner).toEqual({
      id: 'unknown',
      name: '',
      nationality: 'Unknown',
    });
  });

  it('should fallback to "Unknown Circuit" if circuitName is missing', () => {
    const result = raceWinnersMapper(missingCircuitNameData);
    expect(result[0].circuitName).toBe('Unknown Circuit');
  });

  it('should fallback to "Unknown Circuit" if Circuit is undefined', () => {
    const result = raceWinnersMapper(undefinedCircuitData);
    expect(result[0].circuitName).toBe('Unknown Circuit');
  });
});
