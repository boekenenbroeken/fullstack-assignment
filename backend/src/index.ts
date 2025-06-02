import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { prisma } from './lib/prisma.js';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('F1 Champions API is running 🚀');
});

app.get('/test-db', async (_req, res) => {
  try {
    const seasons = await prisma.season.findMany();
    res.json(seasons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
