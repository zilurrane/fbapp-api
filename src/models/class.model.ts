import * as mongoose from 'mongoose';

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

export const ClassModel = mongoose.model('Class', ClassSchema);
