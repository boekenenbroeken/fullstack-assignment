import express from 'express';

import { getChampions, getRaces, testDB } from '../controllers/f1';

const router = express.Router();

router.get('/champions', getChampions);
router.get('/races/:year', getRaces);
router.get('/test-db', testDB);

export default router;
