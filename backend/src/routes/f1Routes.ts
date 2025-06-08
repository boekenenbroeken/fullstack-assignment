import express from 'express';
import { getChampions, testDB, seedSeason } from '../controllers/f1';

const router = express.Router();

router.get('/champions', getChampions);
router.get('/test-db', testDB);
router.get('/seed/:year', seedSeason);

export default router;
