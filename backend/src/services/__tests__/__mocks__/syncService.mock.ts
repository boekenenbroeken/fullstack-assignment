import type { PrismaClient } from '@prisma/client';
import { Mock, vi } from 'vitest';

import { Champion } from '../../../types/ergast';

type DeepMockProxy<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => infer R
    ? Mock<(...args: A) => R>
    : T[P] extends object
      ? DeepMockProxy<T[P]>
      : T[P];
};

export const createPrismaMock = (): DeepMockProxy<PrismaClient> =>
  ({
    driver: {
      upsert: vi.fn(),
      createMany: vi.fn(),
    },
    season: {
      upsert: vi.fn(),
      findMany: vi.fn(),
    },
    team: {
      createMany: vi.fn(),
    },
    driverSeason: {
      createMany: vi.fn(),
    },
    race: {
      createMany: vi.fn(),
    },
  }) as unknown as DeepMockProxy<PrismaClient>;

export const mockChampion = {
  season: '2021',
  driver: { id: 'hamilton', name: 'Lewis Hamilton', nationality: 'British' },
  team: { id: 'mercedes', name: 'Mercedes' },
};

export const mockRaces = [
  {
    id: 1,
    name: 'Mock Grand Prix',
    round: '1',
    winner: {
      id: 'driver1',
      name: 'Mock Driver',
      nationality: 'Mockland',
    },
    team: {
      id: 'team1',
      name: 'Mock Team',
    },
  },
];

export const mockBatchPayload = { count: 1 };

export const mockYear = 2021;

export const mockDriverUpsertResult = {
  id: 'hamilton',
  name: 'Lewis Hamilton',
  nationality: 'British',
};

export const mockSeasonUpsertResult = {
  id: 42,
  year: 2021,
  championId: 'hamilton',
};

export const mockEmptyChampion = null as unknown as Champion;
export const mockEmptyRaces = [];
