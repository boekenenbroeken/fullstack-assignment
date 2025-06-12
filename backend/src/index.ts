import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerSpec, swaggerUi } from './swagger';
import f1Routes from './routes/f1Routes';

dotenv.config();

export const app = express();
const port = process.env.PORT ?? 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('F1 Champions API is running 🚀');
});

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
