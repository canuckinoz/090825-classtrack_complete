const request = require('supertest');
const { app } = require('../app');

describe('Auth and Logs API', () => {
  test('login fails with wrong password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'teacher@example.com', password: 'wrongwrong' });
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  test('login succeeds with correct password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'teacher@example.com', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeTruthy();
  });

  test('create log validation fails', async () => {
    const login = await request(app)
      .post('/api/login')
      .send({ email: 'teacher@example.com', password: 'password' });
    const token = login.body.token;
    const res = await request(app)
      .post('/api/logs')
      .set('Authorization', `Bearer ${token}`)
      .send({ studentId: '', type: 'oops' });
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
  });

  test('create and list logs', async () => {
    const login = await request(app)
      .post('/api/login')
      .send({ email: 'teacher@example.com', password: 'password' });
    const token = login.body.token;
    const created = await request(app)
      .post('/api/logs')
      .set('Authorization', `Bearer ${token}`)
      .send({ studentId: 1, type: 'positive', note: 'Great job' });
    expect(created.status).toBe(201);
    expect(created.body.ok).toBe(true);

    const list = await request(app)
      .get('/api/logs')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body.ok).toBe(true);
    expect(Array.isArray(list.body.logs)).toBe(true);
  });
});
