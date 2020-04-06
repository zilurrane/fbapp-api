import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const DepartmentSchema = new Schema({
    code: {
        type: String,
        required: 'Department code is required',
        unique: true
    },
    name: {
        type: String,
        required: 'Department name is required',
        unique: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

DepartmentSchema.plugin(mongoTenant);
const DepartmentModel: any = mongoose.model('Department', DepartmentSchema);
export const getTenantBoundDepartmentModel = (req: any) => DepartmentModel.byTenant(req.user.tenantId == '0' ? req.header('TenantId'): req.user.tenantId);
