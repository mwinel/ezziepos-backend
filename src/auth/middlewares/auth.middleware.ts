import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../services';

class AuthMiddleware {
    async verifyPassword(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;
        const user: any = await UsersService.getByEmailWithPassword(email);
        if (user) {
            const isPasswordValid = await UsersService.comparePassword(
                user.password,
                req.body.password
            );
            if (isPasswordValid) {
                req.body = {
                    id: user._id,
                    email: user.email,
                    permissionFlag: user.permissionFlag,
                };
                return next();
            }
        }
        // Giving the same message in both cases
        // helps protect against cracking attempts:
        res.status(400).json({ errors: ['Invalid email and/or password'] });
    }
}

export default new AuthMiddleware();
