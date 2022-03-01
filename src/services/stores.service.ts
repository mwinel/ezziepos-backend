import { StoreModel } from '../models';
import { CRUD } from '../common/interfaces/crud.interface';
import { CreateStoreDto, PatchStoreDto } from '../dtos';

class StoresService implements CRUD {
    async create(resource: CreateStoreDto) {
        return StoreModel.create(resource);
    }

    async getAll(limit: number, pages: number) {
        return StoreModel.getAll(limit, pages);
    }

    async getById(id: string) {
        return StoreModel.getById(id);
    }

    async patchById(id: string, resource: PatchStoreDto): Promise<any> {
        return StoreModel.patchById(id, resource);
    }

    async deleteById(id: string) {
        return StoreModel.deleteById(id);
    }
}

export default new StoresService();
