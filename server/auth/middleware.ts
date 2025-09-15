import { ensureClassInScope } from './rbac';

export function requireTeacherClassParam(param: string = 'class_id'){
  return (req: any, _res: any, next: any)=>{
    try{
      const classId = String(req.body?.[param] ?? req.query?.[param] ?? '');
      ensureClassInScope(req.user, classId);
      next();
    }catch(e){ next(e); }
  };
}


