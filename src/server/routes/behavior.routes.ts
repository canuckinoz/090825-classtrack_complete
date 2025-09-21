import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.guard';
import { attachScopeFilters } from '../middleware/scope.middleware';
import { PERMISSIONS } from '../policies/permission.resolver';
import { prisma } from '../../../server/db/prisma';

export const behaviorRouter = Router();

// Example: Get behaviour logs with automatic scope application
behaviorRouter.get(
  '/api/behaviors',
  requireAuth,
  requirePermission(PERMISSIONS.VIEW_CLASS),
  attachScopeFilters,
  async (req, res, next) => {
    try {
      const where = (req.scopeFilters || {}) as any;
      const behaviors = await prisma.behaviourLog.findMany({ where });
      res.json({ ok: true, behaviors });
    } catch (e) {
      next(e);
    }
  }
);
