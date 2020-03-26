import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const StudentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: 'UserId is required',
        ref: 'User'
    },
    rollNumber: {
        type: Number,
        required: 'Student roll number is required'
    },
    name: {
        type: String
    },
    departmentCode: {
        type: String,
        required: 'Department code is required',
    },
    classCode: {
        type: String,
        required: 'Class code is required',
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

StudentSchema.plugin(mongoTenant);
export const StudentModel: any = mongoose.model('Student', StudentSchema);
export const getTenantBoundStudentModel = (tenantId: string) => StudentModel.byTenant(tenantId);
