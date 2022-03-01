import mongoose from 'mongoose';

export const storeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        numberOfEmployees: { type: Number, required: true },
        addressOne: { type: String, required: true, maxlength: 200 },
        addressTwo: { type: String, maxlength: 200 },
        city: { type: String, required: true, maxlength: 100 },
        country: { type: String, required: true, maxlength: 100 },
        countryCode: { type: String, required: true, maxlength: 80 },
        storeIndustry: { type: String, required: true, maxlength: 100 },
        storeType: { type: String, required: true, maxlength: 100 },
        storeCurrency: { type: String, required: true, maxlength: 80 },
        storeDomain: { type: String, required: true, maxlength: 80 },
        isActive: { type: Boolean, default: true },
        storeOwner: {
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
