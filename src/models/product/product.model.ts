import mongoose from 'mongoose';
import { CreateProductDto, PatchProductDto } from '../../dtos';
import { ProductDoc } from '../product/product.interface';
import { prodcutSchema } from '../product/product.schema';

class ProductModel {
    Product = mongoose.model<ProductDoc & mongoose.Document>(
        'Product',
        prodcutSchema
    );

    /**
     * Create product.
     * @param productFields object containing fields to be posted.
     * @returns product object.
     */
    async create(productFields: CreateProductDto) {
        const product = new this.Product({
            ...productFields,
        });
        await product.save();
        return product;
    }

    /**
     * Geat all products.
     * @param limit max number of product objects to be returned.
     * @param page max number of pages to return.
     * @returns products array.
     */
    async getAll(limit = 25, page = 0) {
        return this.Product.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    /**
     * Get product by id.
     * @param id product id.
     * @returns product object.
     */
    async getById(id: string) {
        return this.Product.findById(id).exec();
    }

    /**
     * Update product by id using the PATCH method.
     * @param id product id.
     * @param productFields object containing the opional fields to be updated.
     * @returns product object.
     */
    async patchById(id: string, productFields: PatchProductDto | any) {
        const existingProduct = await this.Product.findOneAndUpdate(
            { _id: id },
            { $set: productFields },
            { new: true }
        ).exec();

        return existingProduct;
    }

    /**
     * Delete product by id.
     * @param id product id.
     * @returns null.
     */
    async deleteById(id: string) {
        return this.Product.deleteOne({ _id: id }).exec();
    }
}

export default new ProductModel();
