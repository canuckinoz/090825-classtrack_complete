import type { UserCtx, UserRole } from './types';

export function requireRole(user: UserCtx | undefined, ...roles: UserRole[]) {
  if (!user || !roles.includes(user.role)) throw forbidden('role_required');
}

export function ensureClassInScope(
  user: UserCtx | undefined,
  classId?: string
) {
  if (!user) throw forbidden('auth_required');
  if (user.role !== 'teacher') return; // non-teachers validated elsewhere
  if (!classId) throw bad('class_id_required');
  const ok = user.scope?.classIds?.includes(classId);
  if (!ok) throw forbidden('out_of_scope');
}

export function stripComparativeFields<T extends Record<string, any>>(data: T) {
  delete (data as any).staff;
  delete (data as any).teacherId;
  delete (data as any).byTeacher;
  delete (data as any).schoolAgg;
  return data;
}

function bad(code: string) {
  const e: any = new Error(code);
  e.status = 400;
  return e;
}
function forbidden(code: string) {
  const e: any = new Error(code);
  e.status = 403;
  return e;
}
