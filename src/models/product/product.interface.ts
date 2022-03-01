import { Types } from 'mongoose';

export interface ProductDoc {
    title: string; // Name of the product.
    description: string; // Description of the product. Supports HTML formatting.
    handle: string; // A unique human-friendly string for the product. Automatically generated from the product's title.
    productType: string; // A product category used for filtering and searching products.
    isActive: boolean; // Whether the product is published or not.
    images: Types.Array<any>; // An array of image objects.
    options: Types.Array<any>; // An array of option objects. e.g. Size, Color, etc.
    variants: Types.Array<any>; // An array of variant objects. e.g. S, M, L, etc.
    createdBy: Types.ObjectId; // The user that created the product.
    updatedBy: Types.ObjectId; // The user that updated the product.
}
