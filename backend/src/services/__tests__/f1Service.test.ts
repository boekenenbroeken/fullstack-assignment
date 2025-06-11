import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as f1Service from '../f1Service';
import { prisma } from '../../lib/prisma';
import * as ergastClient from '../../clients/ergastClient';
import { championMapper, racesMapper } from '../../mappers';
import {
  mockChampion,
  mockChampionApiResponse,
  mockRaces,
  mockPrismaDriverSeason,
  mockSeasonFindUnique,
} from './__mocks__/f1Service.mock';

vi.mock('../../clients/ergastClient');
vi.mock('../../mappers');
vi.mock('../../lib/prisma', () => ({
  prisma: {
    driverSeason: {
      findMany: vi.fn(),
    },
    season: {
      findUnique: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getSeasonChampion', () => {
  it('maps ergast response correctly', async () => {
    vi.mocked(ergastClient.fetchSeasonChampion).mockResolvedValueOnce(mockChampionApiResponse);
    vi.mocked(championMapper).mockReturnValueOnce(mockChampion);

    const result = await f1Service.getSeasonChampion(2021);
    expect(result).toEqual(mockChampion);
  });
});

describe('getAllChampions', () => {
  it('returns champions from prisma', async () => {
    vi.mocked(prisma.driverSeason.findMany).mockResolvedValueOnce(mockPrismaDriverSeason);

    const result = await f1Service.getAllChampions();
    expect(result).toEqual([
      {
        season: '2021',
        driver: { id: 'hamilton', name: 'Lewis Hamilton', nationality: 'British' },
        team: { id: 'mercedes', name: 'Mercedes' },
      },
    ]);
  });
});

describe('getRaces', () => {
  it('maps races correctly', async () => {
    vi.mocked(ergastClient.fetchRaces).mockResolvedValueOnce({
      MRData: { RaceTable: { Races: [] } },
    });
    vi.mocked(racesMapper).mockReturnValueOnce(mockRaces);

    const result = await f1Service.getRaces(2021);
    expect(result).toEqual(mockRaces);
  });
});

describe('getAllRaces', () => {
  it('returns races from prisma', async () => {
    vi.mocked(prisma.season.findUnique).mockResolvedValueOnce(mockSeasonFindUnique);

    const result = await f1Service.getAllRaces(2021);

    expect(result).toEqual(mockRaces);
  });

  it('throws if season not found', async () => {
    vi.mocked(prisma.season.findUnique).mockResolvedValueOnce(null);

    await expect(f1Service.getAllRaces(2021)).rejects.toThrow('Season 2021 not found');
  });
});
