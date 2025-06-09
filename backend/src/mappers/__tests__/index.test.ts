import { describe, it, expect } from 'vitest';

import * as mappers from '../index';
import { driverMapper } from '../driver';
import { racesMapper } from '../races';
import { championMapper } from '../champions';

describe('mappers index exports', () => {
  it('should export driverMapper', () => {
    expect(mappers.driverMapper).toBe(driverMapper);
  });

  it('should export racesMapper', () => {
    expect(mappers.racesMapper).toBe(racesMapper);
  });

  it('should export championMapper', () => {
    expect(mappers.championMapper).toBe(championMapper);
  });
});
