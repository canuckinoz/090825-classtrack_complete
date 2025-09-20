const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const logTypeEnum = z.enum(['positive', 'support', 'growth']);
const createLogSchema = z.object({
  studentId: z.union([z.string(), z.number()]).transform((v) => Number(v)),
  type: logTypeEnum,
  note: z.string().max(1000).optional(),
});

function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source] || {});
      if (source === 'body') req.body = parsed;
      else if (source === 'params') req.params = parsed;
      next();
    } catch (e) {
      if (e && e.issues) {
        const fieldErrors = Object.fromEntries(
          e.issues.map((i) => [i.path.join('.') || '_', i.message])
        );
        return res
          .status(400)
          .json({ ok: false, error: 'validation_error', fields: fieldErrors });
      }
      next(e);
    }
  };
}

module.exports = { loginSchema, createLogSchema, validate };
