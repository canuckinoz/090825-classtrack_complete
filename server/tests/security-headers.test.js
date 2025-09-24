const request = require('supertest');
const { app } = require('../app');

describe('Security headers', () => {
  test('sets X-Content-Type-Options to nosniff', async () => {
    const res = await request(app).get('/api/me');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  test('sets X-Frame-Options to DENY', async () => {
    const res = await request(app).get('/api/me');
    expect(res.headers['x-frame-options']).toBe('DENY');
  });

  test('sets Referrer-Policy to no-referrer', async () => {
    const res = await request(app).get('/api/me');
    expect(res.headers['referrer-policy']).toBe('no-referrer');
  });

  test('sets a restrictive Permissions-Policy', async () => {
    const res = await request(app).get('/api/me');
    const pp = res.headers['permissions-policy'];
    expect(pp).toBeTruthy();
    expect(pp).toContain('geolocation=()');
    expect(pp).toContain('camera=()');
    expect(pp).toContain('microphone=()');
  });
});
