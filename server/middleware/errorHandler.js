module.exports = function errorHandler(err, _req, res, _next) {
  const status = err.status || err.code || 500;
  const message = err.publicMessage || err.message || 'internal_error';
  // minimal logging; in production use a logger
  // eslint-disable-next-line no-console
  console.error('[error]', status, message);
  res.status(Number(status) || 500).json({ ok: false, error: String(message) });
};
