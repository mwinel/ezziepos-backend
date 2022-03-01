import { Request, Response, NextFunction } from 'express';
import { StoresService } from '../services';

class StoresMiddleware {
    async validateRequiredBodyFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (req.body && req.body.name && req.body.numberOfEmployees) {
            next();
        } else {
            res.status(400).json({
                error: `Missing required fields`,
            });
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    async validateStoreExists(req: Request, res: Response, next: NextFunction) {
        const Store = await StoresService.getById(req.params.id);
        if (Store) {
            res.locals.Store = Store;
            next();
        } else {
            res.status(404).json({
                error: `Store not found`,
            });
        }
    }
}

export default new StoresMiddleware();
