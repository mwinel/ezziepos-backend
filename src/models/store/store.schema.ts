import mongoose from 'mongoose';

export const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        numberOfEmployees: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
