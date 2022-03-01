import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongo = new MongoMemoryServer();

/**
 * Connect to mock memory database.
 */
export const connect = async () => {
    const uri = await mongo.getUri();
    await mongoose.connect(uri);
};

/**
 * Close db connection.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
};

/**
 * Delete db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (let key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
