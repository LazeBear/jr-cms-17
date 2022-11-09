require('dotenv').config();
const supertest = require('supertest');
const app = require('../../src/app');
const StudentModel = require('../../src/models/student');
const mongoose = require('mongoose');
const { generateToken } = require('../../src/utils/jwt');

const request = supertest(app);
// axios, fetch

const token = generateToken({ id: 'fake_id' });

const createStudentRequest = async (body) => {
  return request
    .post('/v1/students')
    .set('Authorization', `Bearer ${token}`)
    .send(body);
};

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('/v1/students', () => {
  describe('Create', () => {
    const validStudent = {
      firstName: 'john',
      lastName: 'doe',
      email: 'john@example.com',
    };

    beforeEach(async () => {
      await StudentModel.deleteMany({}).exec();
    });

    it('should save the student if request is valid', async () => {
      const res = await createStudentRequest(validStudent);

      expect(res.statusCode).toBe(201);
      const student = await StudentModel.findOne(validStudent).exec();
      expect(student).toBeTruthy();
    });

    // markdown
    it.each`
      field          | value
      ${'firstName'} | ${'a'}
      ${'email'}     | ${'com'}
    `('should return 400 when $field is $value', async ({ field, value }) => {
      const invalidStudent = {
        ...validStudent,
        // ['firstName']: 'a'
        [field]: value,
      };

      // {
      //   firstName: 'a',
      //   lastName: 'doe',
      //   email: 'john@example.com',
      // }

      const res = await createStudentRequest(invalidStudent);

      expect(res.statusCode).toBe(400);
      // expect(res.body.error).toBe();
    });
  });
});
