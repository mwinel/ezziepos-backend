import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express, { Application, Request, Response } from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';

import { CommonRoutesConfig } from './common/routes.config';
import { AuthRoutes } from './auth/routes';
import { UsersRoutes, StoresRoutes } from './routes';

const app: Application = express();
const routes = Array<CommonRoutesConfig>();

app.use(express.json());
app.use(cors());

// Prepare logging middleware configuration,
// which automatically logs all HTTP requests handled by the server.
const loggerMiddlewareConfig: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerMiddlewareConfig.meta = false; // Log requests as one-liners when not debugging.
    if (typeof global.it === 'function') {
        loggerMiddlewareConfig.level = 'http'; // Silence logging during tests.
    }
}

// Initialize the logger with the above configuration
app.use(expressWinston.logger(loggerMiddlewareConfig));

// Add routes to the routes array
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new StoresRoutes(app));

// Test route to ensure the server is running as expected.
const message = 'Server running on port ' + process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(message);
});

// TODO -----------------------------------------------------------------------
// Create an Error handler middleware that handles all errors thrown by the server.
app.all('*', async (req, res) => {
    res.status(404).json({ error: 'URL Not found' });
});

export { app };
