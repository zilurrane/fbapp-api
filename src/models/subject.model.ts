import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const SubjectSchema = new Schema({
    code: {
        type: String,
        required: 'Subject code is required',
    },
    name: {
        type: String,
        required: 'Subject name is required',
    },
    departmentCode: {
        type: String,
        required: 'Department code is required'
    },
    classCode: {
        type: String,
        required: 'Class code is required'
    },
    parameters: [{
        type: String,
        required: 'Class code is required'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

SubjectSchema.plugin(mongoTenant);
const SubjectModel: any = mongoose.model('Subject', SubjectSchema);
export const getTenantBoundSubjectModel = (req: any) => SubjectModel.byTenant(req.user.tenantId == '0' ? req.header('TenantId'): req.user.tenantId);
