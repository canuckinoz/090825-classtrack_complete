import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { UserClaims } from '../policies/role.policies';

export function verifyJwt(token: string): UserClaims | null {
  try {
    const secret = process.env.JWT_SECRET || '';
    return jwt.verify(token, secret) as UserClaims;
  } catch {
    return null;
  }
}

export function bearerGuard(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token)
    return res.status(401).json({ ok: false, error: 'unauthenticated' });
  const claims = verifyJwt(token);
  if (!claims)
    return res.status(401).json({ ok: false, error: 'unauthenticated' });
  // @ts-expect-error augment at runtime
  req.user = claims;
  next();
}
