import { ProductModel } from '../models';
import { CRUD } from '../common/interfaces/crud.interface';
import { CreateProductDto, PatchProductDto } from '../dtos';

class ProductsService implements CRUD {
    async create(resource: CreateProductDto) {
        return ProductModel.create(resource);
    }

    async getAll(limit: number, pages: number) {
        return ProductModel.getAll(limit, pages);
    }

    async getById(id: string) {
        return ProductModel.getById(id);
    }

    async patchById(id: string, resource: PatchProductDto): Promise<any> {
        return ProductModel.patchById(id, resource);
    }

    async deleteById(id: string) {
        return ProductModel.deleteById(id);
    }
}

export default new ProductsService();
