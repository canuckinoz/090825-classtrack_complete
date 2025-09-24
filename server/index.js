require('dotenv').config();
const { app } = require('./app');

if (!process.env.JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.error(
    'JWT_SECRET is required. Set it in your environment or .env file.'
  );
  process.exit(1);
}

const PORT = Number(process.env.PORT || 3005);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${PORT}`);
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    const base = `http://localhost:${PORT}`;
    setTimeout(async () => {
      try {
        const r = await fetch(`${base}/api/health`);
        // eslint-disable-next-line no-console
        console.log(
          `[probe] GET /api/health -> ${r.status} ${r.ok ? 'PASS' : 'FAIL'}`
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`[probe] /api/health FAILED: ${e?.message || e}`);
      }
      if (isDev && process.env.ENABLE_DEV_PORTAL === 'true') {
        try {
          const r2 = await fetch(
            `${base}/dev/dev-login?role=teacher&redirect=/`,
            { redirect: 'manual' }
          );
          // eslint-disable-next-line no-console
          console.log(
            `[probe] GET /dev/dev-login?role=teacher -> ${r2.status} (expected 303)`
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(`[probe] /dev/dev-login FAILED: ${e?.message || e}`);
        }
      }
    }, 200);
  }
});

module.exports = app;
