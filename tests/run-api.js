const request = require('supertest');
const { app } = require('../server/app');

(async () => {
  try {
    const r = await request(app)
      .post('/api/weather/forecast')
      .set(
        'x-mock-user',
        JSON.stringify({ role: 'teacher', scope: { classIds: ['CLASS-1'] } })
      )
      .send({ class_id: 'CLASS-2' });
    if (r.status !== 403) {
      console.error('Expected 403, got', r.status, 'body:', r.body);
      process.exit(1);
    }
    console.log('api.teacher.scope: passed');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
