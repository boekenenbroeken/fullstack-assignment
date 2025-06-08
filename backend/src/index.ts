import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import f1Routes from './routes/f1Routes.js'; // ✅ must include `.js`

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('F1 Champions API is running 🚀');
});

app.use('/api', f1Routes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
