import mongoose from 'mongoose';

export const storeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxlength: 100 },
        numberOfEmployees: { type: Number, required: true },
        customerEmail: { type: String, required: true, maxlength: 100 },
        customerPhone: { type: String, required: true, maxlength: 100 },
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
        longitude: { type: Number, default: null },
        latitude: { type: Number, default: null },
        source: { type: String, default: null },
        timezone: { type: String, default: null },
        weightUnit: { type: String, default: null },
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
