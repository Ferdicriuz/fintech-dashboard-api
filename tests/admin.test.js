const request = require('supertest');
const app = require('../app');

let token;

describe('Transaction API', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Txn User',
      email: 'txn@test.com',
      password: '123456',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'txn@test.com',
      password: '123456',
    });

    token = login.body.token;
  });

  it('should create a credit transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 3000,
        type: 'credit',
        description: 'Salary',
      });

    expect(res.statusCode).toBe(201);
  });

  it('should reject invalid transaction type', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 2000,
        type: 'invalid',
      });

    expect(res.statusCode).toBe(400);
  });
});
