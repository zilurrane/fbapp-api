import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const FacultySchema = new Schema({
    // id: {
    //     type: Number,
    //     required: 'Faculty Id is required',
    // },
    name: {
        type: String,
        required: 'Faculty name is required',
    },
    email: {
        type: String,
        required: 'Email Id is required',
    },
    qualification: {
        type: String
    },
    departmentCode: {
        type: String,
        required: 'Department code is required'
    },
    classCode: {
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

FacultySchema.plugin(mongoTenant);
const FacultyModel: any = mongoose.model('Faculty', FacultySchema);
export const getTenantBoundFacultyModel = (req: any) => FacultyModel.byTenant(req.user.tenantId == '0' ? req.header('TenantId'): req.user.tenantId);
