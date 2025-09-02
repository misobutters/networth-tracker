import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { createUser, findUserByEmail } from '../store/userStore';
import { signToken } from '../auth/jwt';
import { AuthenticatedRequest } from '../auth/middleware';
import { User } from '../types';

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/register', async (req: AuthenticatedRequest, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const { username, email, password } = parsed.data;
  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: uuid(),
    username,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  await createUser(user);
  const token = signToken({ sub: user.id, username: user.username });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  return res.status(201).json({ id: user.id, username: user.username, email: user.email });
});

router.post('/login', async (req: AuthenticatedRequest, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const { email, password } = parsed.data;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = signToken({ sub: user.id, username: user.username });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  return res.json({ id: user.id, username: user.username, email: user.email });
});

router.post('/logout', (_req: AuthenticatedRequest, res: Response) => {
  res.clearCookie('token');
  return res.status(204).end();
});

router.get('/me', (req: AuthenticatedRequest, res: Response) => {
  if (!req.auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return res.json({ id: req.auth.sub, username: req.auth.username });
});

export default router;
