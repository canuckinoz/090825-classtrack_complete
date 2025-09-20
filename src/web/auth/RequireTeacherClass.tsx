import React from 'react';
import { useUser } from './useUser';

export default function RequireTeacherClass({
  classId,
  children,
}: {
  classId: string;
  children: any;
}) {
  const u: any = useUser();
  if (u.role !== 'teacher') return children;
  const ok = u.scope?.classIds?.includes(classId);
  if (!ok) return <div className="p-6">This class isn’t in your scope.</div>;
  return children;
}
