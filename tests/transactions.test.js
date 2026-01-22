const request = require('supertest');
const app = require('../app'); // Your Express app
const User = require('../models/User');

describe('Transaction API', () => {
  let token;

  beforeAll(async () => {
    // Register a user
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });
    
    token = res.body.token; // assuming you return JWT
  });

  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 1000, type: 'credit', description: 'Test transaction' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('transaction');
    expect(res.body.transaction.amount).toBe(1000);
  });
});
