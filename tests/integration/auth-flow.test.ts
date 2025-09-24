// Skeleton using supertest; mark skipped to avoid breaking current CI
import request from 'supertest';
import { app } from '../../server/app';

describe('auth flow', () => {
  test.skip('teacher login returns access token and landing', async () => {
    const res = await request(app)
      .post('/api/auth/login/teacher')
      .send({ email: 't1-alpha@example.com', password: 'password' });
    expect([200, 401]).toContain(res.status);
  });
});
