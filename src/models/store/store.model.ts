import mongoose from 'mongoose';
import { CreateStoreDto, PatchStoreDto } from '../../dtos';
import { StoreDoc } from '../store/store.interface';
import { storeSchema } from '../store/store.schema';

class StoreModel {
    Store = mongoose.model<StoreDoc & mongoose.Document>('Store', storeSchema);

    /**
     * Create store.
     * @param storeFields object containing fields to be posted.
     * @returns user object.
     */
    async create(storeFields: CreateStoreDto) {
        const store = new this.Store({
            ...storeFields,
        });
        await store.save();
        return store;
    }

    /**
     * Geat all stores.
     * @param limit max number of store objects to be returned.
     * @param page max number of pages to return.
     * @returns stores array.
     */
    async getAll(limit = 25, page = 0) {
        return this.Store.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    /**
     * Get store by.
     * @param id store id.
     * @returns store object.
     */
    async getById(id: string) {
        return this.Store.findById(id).exec();
    }

    /**
     * Update store by id using the PATCH method.
     * @param id store id.
     * @param storeFields object containing the opional fields to be updated.
     * @returns store object.
     */
    async patchById(id: string, storeFields: PatchStoreDto | any) {
        const existingUser = await this.Store.findOneAndUpdate(
            { _id: id },
            { $set: storeFields },
            { new: true }
        ).exec();

        return existingUser;
    }

    /**
     * Delete store by id.
     * @param id store id.
     * @returns null.
     */
    async deleteById(id: string) {
        return this.Store.deleteOne({ _id: id }).exec();
    }
}

export default new StoreModel();
