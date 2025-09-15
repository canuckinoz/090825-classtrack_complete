const { ensureClassInScope } = require('./rbac');

function requireTeacherClassParam(param = 'class_id'){
  return (req, _res, next) => {
    try{
      const classId = String((req.body && req.body[param]) || (req.query && req.query[param]) || '');
      ensureClassInScope(req.user, classId);
      next();
    }catch(e){ next(e); }
  };
}

module.exports = { requireTeacherClassParam };


