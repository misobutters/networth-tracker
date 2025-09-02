import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import { authMiddleware } from './auth/middleware';

const app = express();
const port = 5050;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleware);

app.get('/', (_req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
