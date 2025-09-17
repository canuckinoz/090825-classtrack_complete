import request from 'supertest';
import { app } from '../server/app';

test('teacher cannot fetch other class forecast', async () => {
  const agent = request(app).post('/api/weather/forecast')
    .set('x-mock-user', JSON.stringify({ role:'teacher', scope:{ classIds:['CLASS-1'] } }))
    .send({ class_id: 'CLASS-2' });
  const r = await agent;
  if (r.status !== 403) {
    throw new Error('Expected 403, got ' + r.status + ' body: ' + JSON.stringify(r.body));
  }
});





