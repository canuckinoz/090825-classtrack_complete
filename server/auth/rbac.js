function bad(code) {
  const e = new Error(code);
  e.status = 400;
  return e;
}
function forbidden(code) {
  const e = new Error(code);
  e.status = 403;
  return e;
}

function requireRole(user, ...roles) {
  if (!user || !roles.includes(user.role)) throw forbidden('role_required');
}

function ensureClassInScope(user, classId) {
  if (!user) throw forbidden('auth_required');
  if (user.role !== 'teacher') return;
  if (!classId) throw bad('class_id_required');
  const ok =
    Array.isArray(user.scope?.classIds) &&
    user.scope.classIds.includes(classId);
  if (!ok) throw forbidden('out_of_scope');
}

function stripComparativeFields(data) {
  if (!data || typeof data !== 'object') return data;
  delete data.staff;
  delete data.teacherId;
  delete data.byTeacher;
  delete data.schoolAgg;
  return data;
}

module.exports = { requireRole, ensureClassInScope, stripComparativeFields };
