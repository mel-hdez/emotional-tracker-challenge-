const request = require('supertest');
const Reminder = require('../../models/reminderModel');
let app = ''

jest.mock('../../models/reminderModel');

describe('Reminder Controller', () => {
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

  afterEach(() => {
    jest.restoreAllMocks(); // Restaura los mocks después de cada prueba
  });

  test('should get all reminders for a user', async () => {
    const mockReminders = [
      { _id: '1', user: mockUserId, activity: 'Meeting', date: '2025-03-20', schedule: 'onetime', isArchived: false },
      { _id: '2', user: mockUserId, activity: 'Gym', time: '18:00', schedule: 'daily', isArchived: false }
    ];

    const mockQuery = {
      sort: jest.fn().mockResolvedValue(mockReminders),
    };

    Reminder.find.mockReturnValue(mockQuery);

    const res = await request(app)
      .get('/api/reminders')
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockReminders);
  });


  test('should logically delete a reminder (archive it)', async () => {
    const existingReminder = {
      _id: '5',
      user: mockUserId,
      activity: 'Meditation',
      date: '2025-03-24',
      schedule: 'onetime',
      isArchived: false,
      save: jest.fn().mockResolvedValue({ isArchived: true })
    };

    Reminder.findById.mockResolvedValue(existingReminder);

    const res = await request(app)
      .delete('/api/reminders/5')
      .send();

    expect(res.status).toBe(200);
    expect(existingReminder.isArchived).toBe(true);
    expect(existingReminder.save).toHaveBeenCalled();
  });

  test('should return 404 when deleting a non-existent reminder', async () => {
    Reminder.findById.mockResolvedValue(null);

    const res = await request(app)
      .delete('/api/reminders/99')
      .send();

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Reminder not found');
  });

});
