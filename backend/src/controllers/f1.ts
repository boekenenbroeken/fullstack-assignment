import { Request, Response } from 'express';
import { getAllChampions, getAllRaces } from '../services/f1Service';
import { prisma } from '../lib/prisma';

/**
 * @openapi
 * /api/champions:
 *   get:
 *     summary: Get world champions
 *     description: Returns a list of F1 world champions.
 *     responses:
 *       200:
 *         description: Successfully retrieved champion data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Champion'
 *       500:
 *         description: Failed to get champions due to server error
 */
export const getChampions = async (req: Request, res: Response) => {
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
 *         description: Successfully retrieved seasons from the database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
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
 * /api/races/{year}:
 *   get:
 *     summary: Get races and winners for a specific year
 *     description: Returns a list of races and winners for the given season year.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2022
 *         description: Year of the season to retrieve races for
 *     responses:
 *       200:
 *         description: Successfully retrieved race data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 *       400:
 *         description: Invalid year parameter
 *       500:
 *         description: Failed to get race data due to server error
 */
export const getRaces = async (req: Request<{ year: string }>, res: Response) => {
  try {
    const year = parseInt(req.params.year, 10);

    if (isNaN(year)) {
      res.status(400).json({ error: 'Invalid year parameter' });
      return;
    }

    const data = await getAllRaces(year);
    res.json(data);
  } catch (err) {
    console.error('[getRaces] Failed:', err);
    res.status(500).json({ error: 'Failed to get races' });
  }
};
