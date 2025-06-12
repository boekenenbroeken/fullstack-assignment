import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { barbieTheme } from './lib/barbieCoreSwaggerTheme';
import f1Routes from './routes/f1Routes';
import { swaggerSpec, swaggerUi } from './swagger';

dotenv.config();

export const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('F1 Champions API is running 🚀');
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: barbieTheme,
    customSiteTitle: '💖 F1 Champions API',
  }),
);

app.get('/openapi.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api', f1Routes);

app.get('/health', (_req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
