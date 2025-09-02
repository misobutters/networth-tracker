import jwt from 'jsonwebtoken';

const JWT_SECRET = (process.env.JWT_SECRET || 'dev-secret-change-me') as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JwtClaims {
  sub: string;
  username: string;
}

export function signToken(claims: JwtClaims): string {
  return jwt.sign(claims as any, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any) as string;
}

export function verifyToken(token: string): JwtClaims | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtClaims;
  } catch {
    return null;
  }
}
