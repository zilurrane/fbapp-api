import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const ClassSchema = new Schema({
    code: {
        type: String,
        required: 'Class code is required',
    },
    name: {
        type: String,
        required: 'Class name is required',
    },
    departmentCode: {
        type: String,
        required: 'Department code is required'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

ClassSchema.plugin(mongoTenant);
export const ClassModel: any = mongoose.model('Class', ClassSchema);
export const getTenantBoundClassModel = (tenantId: string) => ClassModel.byTenant(tenantId);
