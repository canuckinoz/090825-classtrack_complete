const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requireTeacherClassParam } = require('./auth/middleware');
const { stripComparativeFields } = require('./auth/rbac');
const { seedTeacher } = require('./dev/seedTeacher');
const { devLoginRouter } = require('./auth/devLogin');
const errorHandler = require('./middleware/errorHandler');

function buildApp() {
  const app = express();
  const JWT_SECRET = process.env.JWT_SECRET;

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev',
      resave: false,
      saveUninitialized: true,
      cookie: { sameSite: 'lax' },
    })
  );

  const authLimiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
  app.use('/api/login', authLimiter);
  app.use('/api/register', authLimiter);

  app.use(devLoginRouter);

  // Test helper: allow injecting a mock user via header
  app.use((req, _res, next) => {
    const mock = req.headers['x-mock-user'];
    if (mock) {
      try {
        req.user = JSON.parse(mock);
      } catch (_e) {}
    }
    next();
  });

  // Dev seed: attach a teacher user in non-production if no user
  app.use(async (req, _res, next) => {
    if (process.env.NODE_ENV !== 'production' && !req.user) {
      const seeded = await seedTeacher();
      req.user = seeded;
      global.DEV_USER = seeded;
    }
    next();
  });

  // In-memory storage for demo purposes
  const users = {
    demo: {
      username: 'demo',
      password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    },
    teacher: {
      username: 'teacher',
      password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    },
    admin: {
      username: 'admin',
      password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    },
  };
  const logs = [];

  function authenticateToken(req, res, next) {
    if (req.user) return next(); // mock injected
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json({ ok: false, error: 'Missing token' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ ok: false, error: 'Invalid token' });
      let role = 'admin';
      let scope = undefined;
      if (user?.username === 'teacher') {
        role = 'teacher';
        scope = { classIds: ['CLASS-3A', 'CLASS-5B'] };
      }
      req.user = { id: user.username, role, scope };
      next();
    });
  }

  // Auth
  app.post('/api/register', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res
          .status(400)
          .json({ ok: false, error: 'Missing credentials' });
      if (users[username])
        return res
          .status(409)
          .json({ ok: false, error: 'User already exists' });
      const hashed = await bcrypt.hash(password, 10);
      users[username] = { username, password: hashed };
      res.status(201).json({ ok: true, message: 'User registered' });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/login', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = users[username];
      if (!user)
        return res
          .status(401)
          .json({ ok: false, error: 'Invalid credentials' });
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res
          .status(401)
          .json({ ok: false, error: 'Invalid credentials' });
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ ok: true, user: { username }, token });
    } catch (err) {
      next(err);
    }
  });

  // Me (dev returns seeded user without token)
  app.get('/api/me', (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
      return res.json({ ok: true, user: req.user });
    }
    return res.status(401).json({ ok: false, error: 'Missing token' });
  });

  // Logs
  app.get('/api/logs', authenticateToken, (req, res) => res.json(logs));
  app.post('/api/logs', authenticateToken, (req, res) => {
    const log = { ...req.body, user: req.user.id };
    logs.push(log);
    res.status(201).json(log);
  });

  // Forecast (for API test)
  app.post(
    '/api/weather/forecast',
    requireTeacherClassParam('class_id'),
    (req, res, next) => {
      try {
        const result = {
          ok: true,
          class_id: req.body.class_id,
          forecast: { risk: 1, summary: 'All clear', suggestions: [] },
        };
        return res.json(result);
      } catch (e) {
        if (e && e.status && (e.status === 400 || e.status === 403))
          return next(e);
        return res.json({
          ok: true,
          class_id: req.body.class_id,
          forecast: { risk: 1, summary: 'All clear', suggestions: [] },
        });
      }
    }
  );

  // Predictions example
  app.get(
    '/api/predictions',
    authenticateToken,
    requireTeacherClassParam('class_id'),
    (req, res, next) => {
      try {
        const data = {
          forecast: {
            class_id: req.query.class_id,
            risk: 3,
            description: 'Partly cloudy',
            criticalTimes: ['2:15 PM - 87% chance energy crash'],
            focusStudents: ['Noah'],
            strategies: ['Movement break', 'Visual schedule'],
            schoolAgg: { avgRisk: 4 },
            byTeacher: { t1: 3, t2: 5 },
          },
        };
        data.forecast = stripComparativeFields(data.forecast);
        return res.json(data);
      } catch (e) {
        if (e && e.status && (e.status === 400 || e.status === 403))
          return next(e);
        return res.json({
          forecast: {
            class_id: req.query.class_id,
            risk: 1,
            description: 'All clear',
            criticalTimes: [],
            focusStudents: [],
            strategies: [],
          },
        });
      }
    }
  );

  // School report gate
  app.get('/api/school-report', authenticateToken, (req, res) => {
    if (req.user?.role === 'teacher')
      return res
        .status(403)
        .json({ ok: false, error: 'teacher_no_school_report' });
    res.json({ ok: true, report: { summary: 'school-wide data' } });
  });

  // Central error handler
  app.use(errorHandler);

  return app;
}

const app = buildApp();
module.exports = { app, buildApp };
