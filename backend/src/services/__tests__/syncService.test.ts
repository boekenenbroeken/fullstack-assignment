import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createPrismaMock,
  mockBatchPayload,
  mockChampion,
  mockDriverUpsertResult,
  mockEmptyChampion,
  mockEmptyRaces,
  mockRaces,
  mockSeasonUpsertResult,
  mockYear,
} from './__mocks__/syncService.mock';

const prismaMock = createPrismaMock();

vi.doMock('../../lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.doMock('../f1Service');

let syncSeason: typeof import('../syncService').syncSeason;
let f1Service: typeof import('../f1Service');

beforeEach(async () => {
  vi.clearAllMocks();

  syncSeason = (await import('../syncService')).syncSeason;
  f1Service = await import('../f1Service');
});

describe('syncSeason', () => {
  it('should sync season successfully', async () => {
    vi.spyOn(f1Service, 'getSeasonChampion').mockResolvedValueOnce(mockChampion);
    vi.spyOn(f1Service, 'getRaces').mockResolvedValueOnce(mockRaces);

    prismaMock.driver.upsert.mockResolvedValueOnce(mockDriverUpsertResult);

    prismaMock.season.upsert.mockResolvedValueOnce(mockSeasonUpsertResult);

    prismaMock.driver.createMany.mockResolvedValueOnce(mockBatchPayload);
    prismaMock.team.createMany.mockResolvedValueOnce(mockBatchPayload);
    prismaMock.driverSeason.createMany.mockResolvedValueOnce(mockBatchPayload);
    prismaMock.race.createMany.mockResolvedValueOnce(mockBatchPayload);

    await syncSeason(mockYear);

    expect(f1Service.getSeasonChampion).toHaveBeenCalledWith(mockYear);
    expect(f1Service.getRaces).toHaveBeenCalledWith(mockYear);
    expect(prismaMock.driver.upsert).toHaveBeenCalled();
    expect(prismaMock.season.upsert).toHaveBeenCalled();
    expect(prismaMock.driver.createMany).toHaveBeenCalled();
    expect(prismaMock.team.createMany).toHaveBeenCalled();
    expect(prismaMock.driverSeason.createMany).toHaveBeenCalled();
    expect(prismaMock.race.createMany).toHaveBeenCalled();
  });

  it('should skip if incomplete data', async () => {
    vi.spyOn(f1Service, 'getSeasonChampion').mockResolvedValueOnce(mockEmptyChampion);
    vi.spyOn(f1Service, 'getRaces').mockResolvedValueOnce(mockEmptyRaces);

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await syncSeason(mockYear);

    expect(consoleSpy).toHaveBeenCalledWith('⚠️ Incomplete data for 2021, skipping.');
  });
});
