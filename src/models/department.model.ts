import * as mongoose from 'mongoose';

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

export const DepartmentModel = mongoose.model('Department', DepartmentSchema);
