import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 100,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        permissionFlag: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false,
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        stores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                (ret.id = ret._id),
                    delete ret._id,
                    delete ret.__v,
                    delete ret.password;
            },
        },
    }
);
