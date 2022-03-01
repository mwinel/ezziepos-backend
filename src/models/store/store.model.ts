import mongoose from 'mongoose';
import { CreateStoreDto, PatchStoreDto } from '../../dtos';
import { StoreDoc } from '../store/store.interface';
import { storeSchema } from '../store/store.schema';

class StoreModel {
    Store = mongoose.model<StoreDoc & mongoose.Document>('Store', storeSchema);

    async create(storeFields: CreateStoreDto) {
        const store = new this.Store({
            ...storeFields,
        });
        await store.save();
        return store;
    }

    async getAll(limit = 25, page = 0) {
        return this.Store.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getById(id: string) {
        return this.Store.findById(id).exec();
    }

    async patchById(id: string, storeFields: PatchStoreDto | any) {
        const existingUser = await this.Store.findOneAndUpdate(
            { _id: id },
            { $set: storeFields },
            { new: true }
        ).exec();

        return existingUser;
    }

    async deleteById(id: string) {
        return this.Store.deleteOne({ _id: id }).exec();
    }
}

export default new StoreModel();
