import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('F1 Champions API is running 🚀');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
