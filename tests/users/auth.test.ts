import request from 'supertest';
import * as dbHandler from '../db';
import { app } from '../../src/app';

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

const userOne = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '0700 222000',
    password: '#4johnDOE',
};

describe('Auth tests', () => {
    it('POST successfully logs in a user', async () => {
        await request(app).post('/users').send(userOne);
        const response = await request(app).post('/auth').send({
            email: userOne.email,
            password: userOne.password,
        });
        expect(response.status).toBe(201);
    });

    it('POST fails to log in a user with invalid credentials', async () => {
        await request(app).post('/users').send(userOne);
        const response = await request(app).post('/auth').send({
            email: userOne.email,
            password: 'helloworld',
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0]).toBe('Invalid email and/or password');
    });
});
