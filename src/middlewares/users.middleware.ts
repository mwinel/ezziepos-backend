import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services';

class UsersMiddleware {
    async validateRequiredUserBodyFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (
            req.body &&
            req.body.firstName &&
            req.body.lastName &&
            req.body.email &&
            req.body.password
        ) {
            next();
        } else {
            res.status(400).json({
                error: `Missing required fields`,
            });
        }
    }

    async validateSameEmailDoesntExist(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = await UsersService.getByEmail(req.body.email);
        if (user) {
            res.status(400).json({ error: `User email already exists` });
        } else {
            next();
        }
    }

    async validateSameEmailBelongToSameUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (res.locals.user._id === req.params.id) {
            next();
        } else {
            res.status(400).json({ error: `Invalid email` });
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    async validateUserExists(req: Request, res: Response, next: NextFunction) {
        const user = await UsersService.getById(req.params.id);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).json({
                error: `User not found`,
            });
        }
    }

    validatePatchEmail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (req.body.email) {
            this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    async extractUserId(req: Request, res: Response, next: NextFunction) {
        req.body.id = req.params.id;
        next();
    }

    async userCantChangePermission(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (
            'permissionFlag' in req.body &&
            req.body.permissionFlag !== res.locals.user.permissionFlag
        ) {
            res.status(400).json({
                errors: ['User cannot change permission flags'],
            });
        } else {
            next();
        }
    }
}

export default new UsersMiddleware();
