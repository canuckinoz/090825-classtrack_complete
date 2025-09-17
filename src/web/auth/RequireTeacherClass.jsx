import React from 'react';
import { useUser } from './useUser';

export default function RequireTeacherClass({ classId, children }){
  const u = useUser();
  if (u.role !== 'teacher') return children;
  const ok = Array.isArray(u.scope?.classIds) && u.scope.classIds.includes(classId);
  if (!ok) return <div className="p-6">This class isn’t in your scope.</div>;
  return children;
}





