import 'reflect-metadata';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import { PostgresStore } from './utils/Postgres';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);

app.get('/', (_req: Request, res: Response) => res.send('API is running'));

const PORT = process.env.PORT || 3000;
PostgresStore.onReady(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});