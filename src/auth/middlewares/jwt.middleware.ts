import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import { UsersService } from '../../services';

// @ts-ignore
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
    verifyRefreshBodyField(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.refreshToken) {
            return next();
        } else {
            return res
                .status(400)
                .json({ errors: ['Missing required field: refreshToken'] });
        }
    }

    async validRefreshNeeded(req: Request, res: Response, next: NextFunction) {
        const user: any = await UsersService.getByEmailWithPassword(
            res.locals.jwt.email
        );
        const salt = crypto.createSecretKey(
            Buffer.from(res.locals.jwt.refreshKey.data)
        );
        const hash = crypto
            .createHmac('sha512', salt)
            .update(res.locals.jwt.id + jwtSecret)
            .digest('base64');
        if (hash === req.body.refreshToken) {
            req.body = {
                id: user._id,
                email: user.email,
                permissionFlag: user.permissionFlag,
            };
            return next();
        } else {
            return res.status(400).json({ errors: ['Invalid refresh token'] });
        }
    }

    validJWTNeeded(req: Request, res: Response, next: NextFunction) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');

                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    res.locals.jwt = jwt.verify(
                        authorization[1],
                        jwtSecret
                    ) as Jwt;
                    next();
                }
            } catch (err) {
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }
}

export default new JwtMiddleware();
