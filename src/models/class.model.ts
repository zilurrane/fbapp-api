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
const ClassModel: any = mongoose.model('Class', ClassSchema);
export const getTenantBoundClassModel = (req: any) => ClassModel.byTenant(req.user.tenantId == '0' ? req.header('TenantId'): req.user.tenantId);
