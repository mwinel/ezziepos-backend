import { Request, Response } from 'express';
import { StoresService } from '../services';

class StoresController {
    async create(req: Request, res: Response) {
        const store = await StoresService.create(req.body);
        res.status(201).json({ store: store });
    }

    async getAll(req: Request, res: Response) {
        const stores = await StoresService.getAll(100, 0);
        res.json({ stores: stores });
    }

    async getById(req: Request, res: Response) {
        const store = await StoresService.getById(req.params.id);
        res.json({ store: store });
    }

    async patchById(req: Request, res: Response) {
        const store = await StoresService.patchById(req.params.id, req.body);
        res.json({ store: store });
    }

    async deleteById(req: Request, res: Response) {
        await StoresService.deleteById(req.params.id);
        res.json({ message: 'Store successfully deleted' });
    }
}

export default new StoresController();
