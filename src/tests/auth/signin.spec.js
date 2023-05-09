/* eslint-disable no-undef */
require('dotenv').config();

const request = require('supertest');
const app = require('../../app');

describe('Signin User', () => {
  test('Should be able to login', async () => {
    const credentials = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    };
    const response = await request(app).post('/auth/signin').send(credentials);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Should not be able to login', async () => {
    const credentials = {
      email: 'error.email@example.com',
      password: 'wrongpassword',
    };
    const response = await request(app).post('/auth/signin').send(credentials);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid Credentials');
  });
});
