import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { app } from '../../index';
import * as f1Service from '../../services/f1Service';
import { prisma } from '../../lib/prisma';
import { mockChampions, mockSeasonData, mockRaces } from './__mocks__/f1.mock';

vi.mock('../src/services/f1Service');
vi.mock('../src/lib/prisma');

vi.mock('../../lib/prisma', () => ({
  prisma: {
    season: {
      findMany: vi.fn(),
    },
  },
}));

describe('GET /api/champions', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns champions successfully', async () => {
    vi.spyOn(f1Service, 'getAllChampions').mockResolvedValueOnce(mockChampions);

    const res = await request(app).get('/api/champions');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        season: '2021',
        driver: {
          id: 'hamilton',
          name: 'Lewis Hamilton',
          nationality: 'British',
        },
        team: {
          id: 'mercedes',
          name: 'Mercedes',
        },
      },
    ]);
  });

  it('handles service error', async () => {
    vi.spyOn(f1Service, 'getAllChampions').mockRejectedValueOnce(new Error('fail'));

    const res = await request(app).get('/api/champions');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to get champions' });
  });
});

describe('GET /api/test-db', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns DB data successfully', async () => {
    vi.mocked(prisma.season.findMany).mockResolvedValueOnce(mockSeasonData);

    const res = await request(app).get('/api/test-db');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ year: 2020, id: 1, championId: '1' }]);
  });

  it('handles DB connection failure', async () => {
    vi.mocked(prisma.season.findMany).mockRejectedValueOnce(new Error('db fail'));

    const res = await request(app).get('/api/test-db');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'DB connection failed' });
  });
});

describe('GET /api/races/:year', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns races for valid year', async () => {
    vi.spyOn(f1Service, 'getAllRaces').mockResolvedValueOnce(mockRaces);

    const res = await request(app).get('/api/races/2021');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRaces);
  });

  it('returns 400 for invalid year (non-number)', async () => {
    const res = await request(app).get('/api/races/not-a-year');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid year parameter' });
  });

  it('handles service error', async () => {
    vi.spyOn(f1Service, 'getAllRaces').mockRejectedValueOnce(new Error('fail'));

    const res = await request(app).get('/api/races/2021');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to get races' });
  });
});
