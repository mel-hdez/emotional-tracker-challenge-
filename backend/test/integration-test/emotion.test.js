const request = require('supertest');
const Emotion = require('../../models/emotionModel');
const User = require('../../models/userModel');
let app = ''

jest.mock('../../models/emotionModel');

describe('Emotion Controller', () => {
  const mockUserId = 'user123';

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
          therapistId: 'therapist123'
        };
        next();
      },
    })
    );
    app = require('../../server');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should get all emotions for a user', async () => {
    const mockEmotions = [
      { _id: '1', user: mockUserId, emotion: 'happy' },
      { _id: '2', user: mockUserId, emotion: 'sad' }
    ];

    jest.spyOn(Emotion, 'find').mockResolvedValue(mockEmotions);

    const res = await request(app)
      .get('/api/emotions')
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmotions);
  });

  test('should return a single emotion by ID', async () => {
    const mockEmotion = { _id: '1', user: mockUserId, emotion: 'happy', intensity: 5, notes: 'Feeling great' };

    Emotion.findById.mockResolvedValue(mockEmotion);

    const res = await request(app)
      .get('/api/emotions/1')
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmotion);
  });

  test('should return 404 when emotion not found', async () => {
    Emotion.findById.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/emotions/1')
      .send();

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Emotion not found');
  });

  test('should create a new emotion', async () => {
    const newEmotion = { emotion: 'neutral', intensity: 4, notes: 'Looking forward to the weekend' };
    const createdEmotion = { ...newEmotion, _id: '3', user: mockUserId };

    Emotion.create.mockResolvedValue(createdEmotion);

    const res = await request(app)
      .post('/api/emotions')
      .send(newEmotion);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdEmotion);
  });

  test('should update an existing emotion', async () => {
    const updatedData = { emotion: 'neutral', intensity: 7, notes: 'Feeling even better' };
    const existingEmotion = { _id: '3', user: mockUserId, emotion: 'neutral', intensity: 4, notes: 'Looking forward to the weekend', save: jest.fn().mockResolvedValue(updatedData) };

    Emotion.findById.mockResolvedValue(existingEmotion);

    const res = await request(app)
      .put('/api/emotions/3')
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedData);
    expect(existingEmotion.save).toHaveBeenCalled();
  });

  test('should return 404 when updating a non-existent emotion', async () => {
    Emotion.findById.mockResolvedValue(null);

    const res = await request(app)
      .put('/api/emotions/3')
      .send({ emotion: 'neutral' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Emotion not found');
  });

  //TODO: Test for summary
  //TODO: Test for share
});
