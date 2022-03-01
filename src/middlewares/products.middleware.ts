import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services';

class ProductsMiddleware {
    async validateRequiredBodyFields(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (req.body && req.body.title) {
            next();
        } else {
            res.status(400).json({
                error: `Missing required fields`,
            });
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    async validateProductExists(req: Request, res: Response, next: NextFunction) {
        const Product = await ProductsService.getById(req.params.id);
        if (Product) {
            res.locals.Product = Product;
            next();
        } else {
            res.status(404).json({
                error: `Product not found`,
            });
        }
    }
}

export default new ProductsMiddleware();
