const express = require('express');
const router = express.Router();

router.get('/dev-login', (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(403).send('disabled in prod');
  const role = String(req.query.role || 'teacher');
  const classIds = String(req.query.classId || 'CLASS-3A').split(',');
  const user = { id: 'TEACH-001', name: 'Demo Teacher', role, scope: { classIds } };
  req.user = user;
  global.DEV_USER = user;
  if (req.session) {
    req.session.user = user;
  }
  const explicit = (req.query.redirect) ? String(req.query.redirect) : '/';
  const proto = (req.headers['x-forwarded-proto']) ? String(req.headers['x-forwarded-proto']) : req.protocol;
  const host = (req.headers['x-forwarded-host']) ? String(req.headers['x-forwarded-host']) : req.get('host');
  const base = `${proto}://${host}`;
  const target = new URL(explicit, base).toString();
  return res.redirect(303, target);
});

router.get('/api/me', (req, res) => {
  const user = (req.session && req.session.user) || global.DEV_USER || null;
  return res.json({ ok: true, user });
});

module.exports = { devLoginRouter: router };


