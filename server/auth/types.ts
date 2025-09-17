export type UserRole = 'teacher'|'leader'|'admin'|'central';
export type TeacherScope = { classIds: string[] };
export type UserCtx = { id: string; role: UserRole; scope?: { classIds?: string[] } };

declare global {
  namespace Express {
    interface User extends UserCtx {}
    interface Request {
      user?: UserCtx;
    }
  }
}



