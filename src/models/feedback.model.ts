import * as mongoose from 'mongoose';
const mongoTenant = require('mongo-tenant');

const Schema = mongoose.Schema;

export const FeedbackSchema = new Schema({
    fbNo: {
        type: Number,
        required: 'Feedback number is required'
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: 'Faculty is required',
        ref: 'Faculty'
    },
    student: {
        type: Schema.Types.ObjectId,
        required: 'Student is required'
    },
    departmentCode: {
        type: String,
        required: 'Department code is required'
    },
    classCode: {
        type: String,
        required: 'Class code is required'
    },
    feedback: {
        type: Object,
        required: 'Feedback is required'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

FeedbackSchema.plugin(mongoTenant);
const FeedbackModel: any = mongoose.model('Feedback', FeedbackSchema);
export const getTenantBoundFeedbackModel = (req: any) => FeedbackModel.byTenant(req.user.tenantId == '0' ? req.header('TenantId'): req.user.tenantId);
