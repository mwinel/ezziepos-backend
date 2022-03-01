import { Request, Response } from 'express';
import { ProductsService } from '../services';

class ProductsController {
    async create(req: Request, res: Response) {
        const product = await ProductsService.create(req.body);
        res.status(201).json({ product: product });
    }

    async getAll(req: Request, res: Response) {
        const products = await ProductsService.getAll(100, 0);
        res.json({ products: products });
    }

    async getById(req: Request, res: Response) {
        const product = await ProductsService.getById(req.params.id);
        res.json({ product: product });
    }

    async patchById(req: Request, res: Response) {
        const product = await ProductsService.patchById(
            req.params.id,
            req.body
        );
        res.json({ product: product });
    }

    async deleteById(req: Request, res: Response) {
        await ProductsService.deleteById(req.params.id);
        res.json({ message: 'Product successfully deleted' });
    }
}

export default new ProductsController();
