import type { Request, Response, NextFunction } from 'express';
import type { UserClaims } from '../policies/role.policies';

export function attachScopeFilters(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const user = (req as any).user as UserClaims | undefined;
  const filters: Record<string, unknown> = {};
  const scope = user?.scope || {};
  const role = user?.role;

  if (role === 'TEACHER') {
    if (scope.classIds?.length) filters['classId'] = { in: scope.classIds };
  }
  if (role === 'LEADER') {
    if (user?.subroles?.includes('YEAR_COORD') && scope.yearLevels?.length) {
      filters['yearLevel'] = { in: scope.yearLevels };
    }
    if (scope.schoolIds?.length) filters['schoolId'] = { in: scope.schoolIds };
  }
  if (role === 'CENTRAL') {
    if (user?.subroles?.includes('DISTRICT_ADMIN') && scope.regionIds?.length) {
      filters['regionId'] = { in: scope.regionIds };
    }
    // CEO has global access; leave filters empty for global aggregates
  }

  (req as any).scopeFilters = filters;
  return next();
}
