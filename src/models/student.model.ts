import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const StudentSchema = new Schema({
    rollNumber: {
        type: Number,
        required: 'Student roll number is required'
    },
    userName: {
        type: String,
        required: 'Student username is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Student password is required',
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },
    departmentCode: {
        type: String,
        required: 'Department code is required',
    },
    classCode: {
        type: String,
        required: 'Class code is required',
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

export const StudentModel = mongoose.model('Student', StudentSchema);
