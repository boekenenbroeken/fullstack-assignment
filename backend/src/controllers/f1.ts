import { Request, Response } from 'express';
import { getAllChampions, getAllRaces } from '../services/f1Service';
import { prisma } from '../lib/prisma';

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

export const getRaces = async (req: Request, res: Response) => {
  try {
    const year = req.params.year ? parseInt(req.params.year, 10) : undefined;

    if (!year || isNaN(year)) {
      res.status(400).json({ error: 'Invalid year parameter' });
      return;
    }

    const data = await getAllRaces(year);
    res.json(data);
  } catch (err) {
    console.error('[getChampions] Failed:', err);
    res.status(500).json({ error: 'Failed to get champions' });
  }
};
