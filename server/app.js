const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { rateLimit } = require('express-rate-limit');
const { requireTeacherClassParam } = require('./auth/middleware');
const { stripComparativeFields } = require('./auth/rbac');
const { seedTeacher } = require('./dev/seedTeacher');
const { devLoginRouter } = require('./auth/devLogin');
const errorHandler = require('./middleware/errorHandler');
const { prisma } = require('./db/prisma');
const {
  loginSchema,
  createLogSchema,
  validate,
} = require('./validation/schemas');

function buildApp() {
  const app = express();
  const JWT_SECRET = process.env.JWT_SECRET;

  app.set('trust proxy', 1);

  // CORS: allow only known dev origins; allow requests without Origin (server-to-server/tests)
  const defaultAllowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];
  const envOrigins = (
    process.env.CORS_ORIGINS ||
    process.env.FRONTEND_ORIGIN ||
    ''
  )
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const allowedOrigins =
    envOrigins.length > 0 ? envOrigins : defaultAllowedOrigins;
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    })
  );
  app.use(cookieParser());

  // Core security headers via Helmet
  app.use(helmet.noSniff());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

  // Strict Content Security Policy (mostly relevant if HTML is ever served)
  const imgSrcList = (process.env.CSP_IMG_SRC || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const connectSrcList = (process.env.CSP_CONNECT_SRC || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const cspDirectives = {
    defaultSrc: ["'none'"],
    baseUri: ["'none'"],
    formAction: ["'none'"],
    frameAncestors: ["'none'"],
    imgSrc: ["'self'", 'data:', ...imgSrcList],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    connectSrc: ["'self'", ...connectSrcList],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  };
  app.use(helmet.contentSecurityPolicy({ directives: cspDirectives }));

  // Permissions-Policy: deny sensitive features by default
  const permissionsPolicy = [
    'geolocation=()',
    'camera=()',
    'microphone=()',
    'payment=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',
    'usb=()',
    'interest-cohort=()',
  ].join(', ');
  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', permissionsPolicy);
    next();
  });
  app.use(bodyParser.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 1000 * 60 * 60 * 8,
      },
    })
  );

  // Debug endpoint: verify cookies/session in dev
  app.get('/api/_debug', (req, res) => {
    try {
      const os = require('node:os');
      res.json({
        ok: true,
        host: os.hostname(),
        headers: {
          origin: req.get('origin') || null,
          cookie: req.get('cookie') ? '[present]' : null,
          userAgent: req.get('user-agent') || null,
        },
        session: {
          hasSession: Boolean(/** @type {any} */ (req).session),
          user: /** @type {any} */ (req).session?.user || null,
          id: /** @type {any} */ (req).sessionID || null,
        },
      });
    } catch (_e) {
      res.json({ ok: true, session: { error: 'debug_failed' } });
    }
  });

  const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: 'too_many_requests' },
  });
  app.use('/api/login', authLimiter);
  app.use('/api/register', authLimiter);

  app.use(devLoginRouter);

  // Dev-only POST dev-login for convenience
  app.post('/auth/dev-login', (req, res) => {
    if (process.env.NODE_ENV === 'production')
      return res
        .status(403)
        .json({ ok: false, error: 'disabled in production' });
    const user = {
      id: 'TEACH-001',
      name: 'Demo Teacher',
      role: 'teacher',
      classId: 'CLASS-3A',
      scope: { classIds: ['CLASS-3A'] },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (/** @type {any} */ (req).session)
      /** @type {any} */ (req).session.user = user;
    return res.json({ ok: true, user });
  });

  // Dev Portal (non-production and ENABLE_DEV_PORTAL=true)
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.ENABLE_DEV_PORTAL === 'true'
  ) {
    app.get('/_dev/login', (_req, res) => {
      const html = `<!doctype html>
        <html><head><meta charset="utf-8"><title>Dev Portal</title>
        <style>body{font-family:system-ui;padding:24px;background:#f7f9fc} .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px} .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px} a.btn{display:inline-block;margin-top:8px;background:#0ea5e9;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none}</style>
        </head><body>
        <h1>Developer Login</h1>
        <div class="grid">
          <div class="card"><h3>Teacher</h3><p>Class-focused supportive view</p><a class="btn" href="/dev-login?role=teacher&classId=CLASS-3A&redirect=/">Login</a></div>
          <div class="card"><h3>Leader (Principal)</h3><p>School aggregates, no comparisons</p><a class="btn" href="/dev-login?role=admin&classId=CLASS-3A&redirect=/">Login</a></div>
        </div>
        </body></html>`;
      res.type('text/html').send(html);
    });
  }

  // Test helper: allow injecting a mock user via header
  app.use((req, _res, next) => {
    const mockHeader = req.headers['x-mock-user'];
    const mock = Array.isArray(mockHeader) ? mockHeader[0] : mockHeader;
    if (typeof mock === 'string') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        req.user = JSON.parse(mock);
      } catch (_e) {}
    }
    next();
  });

  // Dev seed: attach a teacher user in non-production if no user
  app.use(async (req, _res, next) => {
    if (process.env.NODE_ENV !== 'production' && !req.user) {
      const seeded = await seedTeacher();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req.user = /** @type {any} */ (seeded);
      global.DEV_USER = seeded;
    }
    next();
  });

  // DB-backed
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req.user = /** @type {any} */ ({ id: user.username, role, scope });
      next();
    });
  }

  // Auth
  app.post('/api/register', async (req, res, next) => {
    try {
      const { email, password, name, role = 'teacher' } = req.body;
      if (!email || !password || !name)
        return res
          .status(400)
          .json({ ok: false, error: 'Missing credentials' });
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists)
        return res
          .status(409)
          .json({ ok: false, error: 'User already exists' });
      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { email, passwordHash: hashed, name, role },
      });
      res.status(201).json({ ok: true, message: 'User registered' });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/login', validate(loginSchema), async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res
          .status(401)
          .json({ ok: false, error: 'Invalid credentials' });
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match)
        return res
          .status(401)
          .json({ ok: false, error: 'Invalid credentials' });
      const token = jwt.sign({ username: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({
        ok: true,
        user: { username: user.email, name: user.name, role: user.role },
        token,
      });
    } catch (err) {
      next(err);
    }
  });

  // Session auth: real email+password, sets req.session.user
  app.post('/auth/login', async (req, res, next) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password)
        return res
          .status(400)
          .json({ ok: false, error: 'email and password required' });
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res
          .status(401)
          .json({ ok: false, error: 'invalid credentials' });
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match)
        return res
          .status(401)
          .json({ ok: false, error: 'invalid credentials' });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (/** @type {any} */ (req).session) {
        /** @type {any} */ (req).session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return res.json({
        ok: true,
        user: { email: user.email, name: user.name, role: user.role },
      });
    } catch (e) {
      next(e);
    }
  });

  app.post('/auth/logout', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sess = /** @type {any} */ (req).session;
    if (sess && typeof sess.destroy === 'function') {
      sess.destroy(() => res.json({ ok: true }));
    } else {
      res.json({ ok: true });
    }
  });

  // Me (dev returns seeded user without token)
  app.get('/api/me', (req, res) => {
    // Prefer session user when present; fall back to dev-injected user
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sessUser =
      /** @type {any} */ (req).session && /** @type {any} */ (req).session.user;
    const user = sessUser || req.user || null;
    if (!user)
      return res.status(200).json({ ok: false, error: 'unauthenticated' });
    return res.json({ ok: true, user });
  });

  // Logs
  app.get('/api/logs', authenticateToken, async (req, res, next) => {
    try {
      const data = await prisma.behaviourLog.findMany({
        include: { student: true, author: true },
        orderBy: { id: 'desc' },
      });
      res.json({ ok: true, logs: data });
    } catch (e) {
      next(e);
    }
  });
  app.post(
    '/api/logs',
    authenticateToken,
    validate(createLogSchema),
    async (req, res, next) => {
      try {
        const { studentId, type, note } = req.body;
        const created = await prisma.behaviourLog.create({
          data: {
            studentId: Number(studentId),
            authorUserId: Number(req.user.id) || 1,
            type,
            note,
          },
        });
        res.status(201).json({ ok: true, log: created });
      } catch (e) {
        next(e);
      }
    }
  );

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

  // Simple session-based auth guard (dev-safe)
  function authRequired(req, res, next) {
    const sessUser =
      /** @type {any} */ (req).session && /** @type {any} */ (req).session.user;
    const user = sessUser || req.user || null;
    if (!user)
      return res.status(401).json({ ok: false, error: 'unauthenticated' });
    return next();
  }

  // API router
  const apiRouter = express.Router();

  apiRouter.get('/classes', authRequired, (_req, res) => {
    res
      .type('application/json')
      .json({ ok: true, classes: [{ id: 'CLASS-3A', name: 'Class 3A' }] });
  });

  app.use('/api', apiRouter);

  // Central error handler
  app.use(errorHandler);

  return app;
}

const app = buildApp();
module.exports = { app, buildApp };
