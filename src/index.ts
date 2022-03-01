import mongoose from 'mongoose';
import { app } from './app';

const message = 'Server running on port ' + process.env.PORT;

const startServer = async () => {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL must be defined.');
    }

    const db = mongoose.connection;
    mongoose.connect(process.env.DATABASE_URL);
    db.on('error', (err) => console.log(err.message));
    db.once('open', () => console.log('Connected to the database'));

    app.listen(process.env.PORT, () => {
        console.log(message);
    });
};

startServer();
