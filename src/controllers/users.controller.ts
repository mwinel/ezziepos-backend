import { Request, Response } from 'express';
import { UsersService } from '../services';
import { PermissionFlag } from '../common/middlewares/permissionflag.enum';

class UsersController {
    async create(req: Request, res: Response) {
        req.body.password = await UsersService.hashPassword(req.body.password);
        const user = await UsersService.create({
            ...req.body,
            permissionFlag: PermissionFlag.STORE_OWNER_PERMISSION,
        });
        res.status(201).json({ user: user });
    }

    async getAll(req: Request, res: Response) {
        const users = await UsersService.getAll(100, 0);
        res.json({ users: users });
    }

    async getById(req: Request, res: Response) {
        const user = await UsersService.getById(req.params.id);
        res.json({ user: user });
    }

    async patchById(req: Request, res: Response) {
        if (req.body.password) {
            req.body.password = await UsersService.hashPassword(
                req.body.password
            );
        }
        const user = await UsersService.patchById(req.params.id, req.body);
        res.json({ user: user });
    }

    async deleteById(req: Request, res: Response) {
        await UsersService.deleteById(req.params.id);
        res.json({ message: 'User successfully deleted' });
    }
}

export default new UsersController();
