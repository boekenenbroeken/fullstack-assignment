import { describe, expect, it } from 'vitest';

import { championMapper } from '../champions';
import { driverMapper } from '../driver';
import * as mappers from '../index';
import { racesMapper } from '../races';

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
