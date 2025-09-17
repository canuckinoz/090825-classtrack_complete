const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/dev-login'],
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
      xfwd: true,
    })
  );
};


