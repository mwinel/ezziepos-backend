import { Application } from 'express';
import { body } from 'express-validator';
import AuthController from './controllers/auth.controller';
import AuthMiddleware from './middlewares/auth.middleware';
import JwtMiddleware from './middlewares/jwt.middleware';
import { CommonRoutesConfig } from '../common/routes.config';
import BodyValidationMiddleware from '../common/middlewares/body.validation.middleware';

export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): Application {
        this.app.post(
            '/auth',
            [
                body('email')
                    .isEmail()
                    .withMessage('Invalid email and/or password'),
                body('password')
                    .isString()
                    .withMessage('Invalid email and/or password'),
            ],
            BodyValidationMiddleware.verifyBodyFields,
            AuthMiddleware.verifyPassword,
            AuthController.createJWTToken
        );

        this.app.post(
            '/auth/refresh-token',
            [],
            JwtMiddleware.validJWTNeeded,
            JwtMiddleware.verifyRefreshBodyField,
            JwtMiddleware.validRefreshNeeded,
            AuthController.createJWTToken
        );

        return this.app;
    }
}
