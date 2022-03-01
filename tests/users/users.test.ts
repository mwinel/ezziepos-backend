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

const userTwo = {
    firstName: 'Mary',
    lastName: 'Jane',
    email: 'maryjane@example.com',
    phoneNumber: '0700 111000',
    password: 'MARY@Jane#2020',
};

describe('User tests', () => {
    it('POST successfully creates a user', async () => {
        const response = await request(app).post('/users').send(userOne);
        expect(response.status).toBe(201);
        expect(response.body.user.email).toBe(userOne.email);
    });

    it('GET successfully retrieves a list of users', async () => {
        await request(app).post('/users').send(userOne);
        await request(app).post('/users').send(userTwo);
        const loginResponse = await request(app).post('/auth').send({
            email: userOne.email,
            password: userOne.password,
        });
        const response = await request(app)
            .get('/users')
            .set({ Authorization: `Bearer ${loginResponse.body.accessToken}` })
            .send();
        expect(response.status).toBe(200);
        expect(response.body.users.length).toBe(2);
    });

    it('GET successfully retrieves a user by id', async () => {
        const userOneResponse = await request(app).post('/users').send(userOne);
        const userTwoResponse = await request(app).post('/users').send(userTwo);
        const loginResponse = await request(app).post('/auth').send({
            email: userOne.email,
            password: userOne.password,
        });
        const response = await request(app)
            .get(`/users/${userTwoResponse.body.user.id}`)
            .set({ Authorization: `Bearer ${loginResponse.body.accessToken}` })
            .send();
        expect(response.status).toBe(200);
        expect(response.body.user.email).toBe(userTwo.email);
    });

    it('PATCH successfully updates a user by id', async () => {
        const userOneResponse = await request(app).post('/users').send(userOne);
        const userTwoResponse = await request(app).post('/users').send(userTwo);
        const loginResponse = await request(app).post('/auth').send({
            email: userOne.email,
            password: userOne.password,
        });
        const response = await request(app)
            .patch(`/users/${userTwoResponse.body.user.id}`)
            .set({ Authorization: `Bearer ${loginResponse.body.accessToken}` })
            .send({
                lastName: 'Jane Aya',
            });
        expect(response.status).toBe(200);
        expect(response.body.user.lastName).toBe('Jane Aya');
    });

    it('DELETE successfully deletes a user by id', async () => {
        const userOneResponse = await request(app).post('/users').send(userOne);
        const userTwoResponse = await request(app).post('/users').send(userTwo);
        const loginResponse = await request(app).post('/auth').send({
            email: userOne.email,
            password: userOne.password,
        });
        const response = await request(app)
            .delete(`/users/${userTwoResponse.body.user.id}`)
            .set({ Authorization: `Bearer ${loginResponse.body.accessToken}` })
            .send();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User successfully deleted');
    });
});
