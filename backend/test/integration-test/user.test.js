const request = require('supertest');
const jwt = require('jsonwebtoken');
const { describe, expect, test, beforeAll, afterAll } = require('@jest/globals');
const User = require('../../models/userModel');
let app = ''

const newUser = {
  _id: '963734fe',
  name: 'NewUser',
  email: 'newuser@example.com',
  password: 'password123'
};

const loginUser = {
  email: 'login@example.com',
  password: 'password123'
};

describe('User Controller', () => {
  beforeAll(async () => {
    jest.mock('../../config/db.js', () => ({
      connect: jest.fn().mockResolvedValue(null),
    })
    );

    jest.mock('../../middlewares/authMiddleware.js', () => ({
      protect: (req, res, next) => {
        req.user = {
          _id: '5f8d9f4d0a1f1e001d1c3d',
          name: 'Test User',
          email: 'terapify@example.com',
          role: 'user',
        };
        next();
      },
    })
    );
    app = require('../../server');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Should throw error if user already exists', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({});

    const res = await request(app)
      .post('/api/users/register')
      .send(newUser);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'User already exists' });
    expect(User.findOne).toHaveBeenCalled();
  });

  test('Should register a new user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(User, 'create').mockResolvedValue(newUser);

    const res = await request(app)
      .post('/api/users/register')
      .send(newUser);
    expect(res.status).toBe(201);
    expect(User.create).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(res.body).toHaveProperty('name', 'NewUser');
    expect(res.body).toHaveProperty('email', 'newuser@example.com');
  });

  test('should login user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ ...loginUser, matchPassword: jest.fn().mockReturnValue(true) });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(User.findOne).toHaveBeenCalled();
    expect(res.body).toHaveProperty('email', 'login@example.com');
    expect(res.body).toHaveProperty('token');
  });

  test('should return error if invalid email or password on login', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null)

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'wrong.email@example.com',
        password: 'wrongpassword'
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
  });

  test('Should retrieve user profile', async () => {
    jest.spyOn(User, 'findById').mockResolvedValue({
      _id: '5f8d9f4d0a1f1e001d1c3d',
      name: 'Test User',
      email: 'terapify@example.com',
      role: 'user',
    });

    const res = await request(app).get('/api/users/profile')
    expect(User.findById).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  test('should update user profile', async () => {
    const updatedData = { name: 'UpdatedUser', email: 'updated@example.com' };
    const token = jwt.sign({ id: newUser._id }, 'mysecretkey123', { expiresIn: '30d' });
    jest.spyOn(User, 'findById').mockResolvedValue({ ...updatedData, save: jest.fn().mockResolvedValue(true) });
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ updatedData });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', updatedData.name);
    expect(res.body).toHaveProperty('email', updatedData.email);
  });

  test('should reset password', async () => {
    const resetData = { email: 'terapify@example.com', password: 'newpassword123' };
    jest.spyOn(User, 'findOne').mockResolvedValue({ ...newUser, save: jest.fn().mockResolvedValue(true) });

    const res = await request(app)
      .put('/api/users/reset-password')
      .send(resetData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Password reset successfully');
  });

});