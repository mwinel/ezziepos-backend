import mongoose from 'mongoose';

export const prodcutSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxlength: 200 },
        description: { type: String },
        handle: { type: String, required: true, maxlength: 200 },
        productType: { type: String, required: true, maxlength: 200 },
        isActive: { type: Boolean, default: true },
        images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
        options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
        variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                (ret.id = ret._id), delete ret._id, delete ret.__v;
            },
        },
    }
);
