import { UserModel } from '../models';
import { CRUD } from '../common/interfaces/crud.interface';
import { CreateUserDto, PatchUserDto } from '../dtos';

class UsersService implements CRUD {
    async create(resource: CreateUserDto) {
        return UserModel.create(resource);
    }

    async getAll(limit: number, pages: number) {
        return UserModel.getAll(limit, pages);
    }

    async getById(id: string) {
        return UserModel.getById(id);
    }

    async getByEmail(email: string) {
        return UserModel.getByEmail(email);
    }

    async getByEmailWithPassword(email: string) {
        return UserModel.getByEmailWithPassword(email);
    }

    async patchById(id: string, resource: PatchUserDto): Promise<any> {
        return UserModel.updateById(id, resource);
    }

    async deleteById(id: string) {
        return UserModel.deleteById(id);
    }

    async hashPassword(password: string) {
        return UserModel.toHash(password);
    }

    async comparePassword(password: string, hash: string) {
        return UserModel.compare(password, hash);
    }
}

export default new UsersService();
