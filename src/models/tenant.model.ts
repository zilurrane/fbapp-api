import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TenantSchema = new Schema({
    code: {
        type: String,
        required: 'Code is required',
        unique: true
    },
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

export const TenantModel: any = mongoose.model('Tenant', TenantSchema);
