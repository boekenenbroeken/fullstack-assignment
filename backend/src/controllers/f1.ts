import { Request, Response } from 'express';
import { getAllChampions } from '../services/f1Service';
import { prisma } from '../lib/prisma';
import { syncSeason } from '../services/syncService';

/**
 * @openapi
 * /api/champions:
 *   get:
 *     summary: Get world champions for specified seasons
 *     description: Returns a list of F1 world champions for the provided years. If no years are specified, defaults to 2020–2022.
 *     parameters:
 *       - in: query
 *         name: years
 *         schema:
 *           type: string
 *           example: 2020,2021
 *         description: Comma-separated list of years
 *     responses:
 *       200:
 *         description: List of champion data
 *       500:
 *         description: Server error
 */
export const getChampions = async (_req: Request, res: Response) => {
  try {
    const data = await getAllChampions();
    res.json(data);
  } catch (err) {
    console.error('[getChampions] Failed:', err);
    res.status(500).json({ error: 'Failed to get champions' });
  }
};

/**
 * @openapi
 * /api/test-db:
 *   get:
 *     summary: Test database connectivity
 *     description: Returns a list of seasons from the database to verify DB connection.
 *     responses:
 *       200:
 *         description: List of seasons from the database
 *       500:
 *         description: Database connection failed
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
 * @openapi
 * /api/seed/{year}:
 *   get:
 *     summary: Seed season data
 *     description: Seeds race and champion data for a given year.
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The season year to seed
 *     responses:
 *       200:
 *         description: Successfully seeded the season
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 year:
 *                   type: integer
 *       400:
 *         description: Invalid year format
 *       500:
 *         description: Seeding failed
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
