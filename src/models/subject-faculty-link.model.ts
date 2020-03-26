import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const SubjectFacultyLinkSchema = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        required: 'Subject id is required',
        ref: 'Subject',
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: 'Faculty id is required',
        ref: 'Faculty',
    },
    parameter: {
        type: String,
        required: 'Subject parameter is required',
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

SubjectFacultyLinkSchema.plugin(mongoTenant);
export const SubjectFacultyLinkModel: any = mongoose.model('SubjectFacultyLink', SubjectFacultyLinkSchema);
export const getTenantBoundSubjectFacultyLinkModel = (tenantId: string) => SubjectFacultyLinkModel.byTenant(tenantId);
