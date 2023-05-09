/* eslint-disable no-undef */
require('dotenv').config();

const request = require('supertest');
const app = require('../../app');

describe('Signup', () => {
  test('Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'y5!sA',
      confirmPassword: 'y5!sA',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );
  });

  test('Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'y5ys!@a',
      confirmPassword: 'y5ys!@a',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );
  });

  test('Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'yysA!L',
      confirmPassword: 'yysA!L',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );
  });

  test('Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'y5ysAb',
      confirmPassword: 'y5ysAb',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );
  });

  test('Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'ABCD34!',
      confirmPassword: 'ABCD34!',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Password must have minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    );
  });

  test('CPF must be valid', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14607588006',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid CPF');
  });

  test('User must accept terms of use', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: false,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('You must accept the terms of use');
  });

  test('Password and Confirm Password are differents', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@2',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('Invalid email domain error', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'emailinvalido@email.maluco',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('"Email" must be a valid email');
  });

  test('Emails with emojis must not be registered', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'wrong.email🌼🌺🌸@email.com',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid email');
  });

  test('Emails with only numbers (8 minimum) must not be registered', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: '12345678@email.com',
      cpf: '14807584006',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid email');
  });

  test('CPF must be 11 characters long (too short)', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807580',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('CPF must be 11 characters');
  });

  test('Email must have a minimum of 6 characters', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgo@ka.net',
      cpf: '73439826058',
      phone: '11945832903',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid email');
  });

  test('Phone must be minimun 11 characters long', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: 'palgos@ka.net',
      cpf: '14807584006',
      phone: '11945832',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Phone must be at least 11 characters');
  });

  test('Email is a required field', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email is a required field');
  });

  test('Email cannot be empty', async () => {
    const credentials = {
      name: 'Anne Rhodes',
      email: '   ',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email cannot be an empty field');
  });

  test('Name is a required field', async () => {
    const credentials = {
      email: 'testmais@example.com',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Name is a required field');
  });

  test('Name cannot be an empty field', async () => {
    const credentials = {
      name: '    ',
      email: 'testmais@example.com',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Name cannot be an empty field');
  });

  test('Name must have at least 2 characters', async () => {
    const credentials = {
      name: 'a',
      email: 'testmais@example.com',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Name must be at least 2 characters');
  });

  test('Password is a required field', async () => {
    const credentials = {
      name: 'Elizabeth Garza',
      email: 'testmais@example.com',
      cpf: '14807584006',
      phone: '11945832123',
      confirmPassword: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Password is a required field');
  });

  test('Confirm Password is a required field', async () => {
    const credentials = {
      name: 'Elizabeth Garza',
      email: 'testmais@example.com',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Confirm Password is a required field');
  });

  test('Confirm Password is a required field', async () => {
    const credentials = {
      name: 'Elizabeth Garza',
      email: 'testmais@example.com',
      cpf: '14807584006',
      phone: '11945832123',
      password: 'CorrecT@1',
      confirmPassword: '   ',
      acceptTerms: true,
    };
    const response = await request(app).post('/auth/signup').send(credentials);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'Confirm Password cannot be an empty field'
    );
  });

  test('Should not allow two accounts with the same email', async () => {
    let credentials = {
      name: 'Elizabeth Garza',
      email: 'testmail@email.com',
      cpf: '025.603.860-03',
      phone: '11945832123',
      password: '@Correct1',
      confirmPassword: '@Correct1',
      acceptTerms: true,
    };
    const userCreated = await request(app)
      .post('/auth/signup')
      .send(credentials);
    const userAlreadyExists = await request(app)
      .post('/auth/signup')
      .send(credentials);
    expect(userAlreadyExists.statusCode).toBe(409);
    expect(userAlreadyExists.body.message).toBe('Email already exists');
    credentials = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    };

    let response = await request(app).post('/auth/signin').send(credentials);
    expect(response.statusCode).toBe(200);
    const token = response.body.token;
    response = await request(app)
      .delete(`/users/${userCreated.body.user.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test('Should not allow two accounts with the same CPF', async () => {
    let credentials = {
      name: 'Elizabeth Garza',
      email: 'testmail@email.com',
      cpf: '025.603.860-03',
      phone: '11945832123',
      password: '@Correct1',
      confirmPassword: '@Correct1',
      acceptTerms: true,
    };
    const userCreated = await request(app)
      .post('/auth/signup')
      .send(credentials);
    credentials = {
      name: 'Elizabeth Garza',
      email: 'testmail2@email.com',
      cpf: '025.603.860-03',
      phone: '11945832123',
      password: '@Correct1',
      confirmPassword: '@Correct1',
      acceptTerms: true,
    };
    const userAlreadyExists = await request(app)
      .post('/auth/signup')
      .send(credentials);
    expect(userAlreadyExists.statusCode).toBe(409);
    expect(userAlreadyExists.body.message).toBe('CPF already exists');
    credentials = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    };

    let response = await request(app).post('/auth/signin').send(credentials);
    expect(response.statusCode).toBe(200);
    const token = response.body.token;
    response = await request(app)
      .delete(`/users/${userCreated.body.user.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test('Should register an account', async () => {
    let credentials = {
      name: 'Elizabeth Garza',
      email: 'testmail@email.com',
      cpf: '025.603.860-03',
      phone: '11945832123',
      password: '@Correct1',
      confirmPassword: '@Correct1',
      acceptTerms: true,
    };
    const user = await request(app).post('/auth/signup').send(credentials);
    expect(user.statusCode).toBe(201);

    credentials = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    };

    let response = await request(app).post('/auth/signin').send(credentials);
    expect(response.statusCode).toBe(200);
    const token = response.body.token;
    response = await request(app)
      .delete(`/users/${user.body.user.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
