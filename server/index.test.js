const request = require('supertest');
const app = require('./index');

console.log('Running server tests...');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });

  it('should not register a user with a duplicate username', async () => {
    await request(app)
      .post('/api/register')
      .send({
        username: 'testuser2',
        password: 'password',
      });
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser2',
        password: 'password',
      });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'demo',
        password: 'password',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'demo',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
