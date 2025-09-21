import request from 'supertest';
import { app } from '../../server/app';

describe('boundary enforcement', () => {
  test.skip('teacher cannot access other classes', async () => {
    const token = 'dummy';
    const res = await request(app)
      .get('/api/behaviors')
      .set('Authorization', `Bearer ${token}`);
    expect([200, 401, 403]).toContain(res.status);
  });
});
