import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class AuthController {
    async createJWTToken(req: Request, res: Response) {
        try {
            const refreshId = req.body.id + jwtSecret;
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            const hash = crypto
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: process.env.JWT_TOKEN_EXPIRATION,
            });

            return res
                .status(201)
                .json({ accessToken: token, refreshToken: hash });
        } catch (err: any) {
            res.status(500).send({ errors: [err.message] });
        }
    }
}

export default new AuthController();
