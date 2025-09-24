import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { UserClaims } from '../policies/role.policies';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserClaims;
    scopeFilters?: Record<string, unknown>;
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers['authorization'] || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token)
      return res.status(401).json({ ok: false, error: 'unauthenticated' });
    const secret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, secret) as UserClaims;
    (req as any).user = { id: (decoded as any).userId, ...decoded } as any;
    return next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: 'unauthenticated' });
  }
}
