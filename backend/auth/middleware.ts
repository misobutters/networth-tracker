import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';

export interface AuthenticatedRequest extends Request {
  auth?: {
    sub: string;
    username: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const cookieHeader = (req.headers.cookie || '').split(';').find((c) => c.trim().startsWith('token='));
  const cookieToken = cookieHeader ? cookieHeader.split('=')[1] : undefined;
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;
  const token = cookieToken || headerToken;
  if (token) {
    const claims = verifyToken(token);
    if (claims) {
      req.auth = { sub: claims.sub, username: claims.username };
    }
  }
  next();
}
