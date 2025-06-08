import { describe, it, expect } from 'vitest';

import * as mappers from '../index';
import { driverMapper } from '../driver';
import { raceWinnersMapper } from '../raceWinners';
import { championsMapper } from '../champions';

describe('mappers index exports', () => {
  it('should export driverMapper', () => {
    expect(mappers.driverMapper).toBe(driverMapper);
  });

  it('should export raceWinnersMapper', () => {
    expect(mappers.raceWinnersMapper).toBe(raceWinnersMapper);
  });

  it('should export championsMapper', () => {
    expect(mappers.championsMapper).toBe(championsMapper);
  });
});
