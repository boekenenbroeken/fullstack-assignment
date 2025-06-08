import { Request, Response } from 'express';
import { getChampionsForSeasons } from '../services/f1Service';
import { prisma } from '../lib/prisma';
import { syncSeason } from '../services/syncService';

/**
 * GET /api/champions?years=2020,2021
 * Fetches world champions for specified seasons
 */
export const getChampions = async (req: Request, res: Response) => {
  try {
    const { years } = req.query;
    const yearList = typeof years === 'string' ? years.split(',') : ['2020', '2021', '2022'];

    const data = await getChampionsForSeasons(yearList);
    res.json(data);
  } catch (err) {
    console.error('[getChampions] Failed:', err);
    res.status(500).json({ error: 'Failed to get champions' });
  }
};

/**
 * GET /api/test-db
 * Verifies database connectivity
 */
export const testDB = async (_req: Request, res: Response) => {
  try {
    const seasons = await prisma.season.findMany();
    res.json(seasons);
  } catch (err) {
    console.error('[testDB] DB error:', err);
    res.status(500).json({ error: 'DB connection failed' });
  }
};

/**
 * GET /api/seed/:year
 * Seeds race and champion data for a given year
 */
export const seedSeason = async (req: Request, res: Response) => {
  const year = Number(req.params.year);

  if (isNaN(year)) {
    res.status(400).json({ error: 'Invalid year format' });
  }

  try {
    await syncSeason(year);
    res.status(200).json({ success: true, year });
  } catch (err) {
    console.error(`[seedSeason] Failed to seed year ${year}:`, err);
    res.status(500).json({ error: 'Seeding failed', details: String(err) });
  }
};
