import type { Request, Response, NextFunction } from 'express';

export function requirePermission(permission: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const usr: any = (req as any).user;
    const has = Boolean(usr?.permissions?.includes?.(permission));
    if (!has) return res.status(403).json({ ok: false, error: 'forbidden' });
    return next();
  };
}
