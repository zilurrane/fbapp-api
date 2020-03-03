import * as mongoose from 'mongoose';

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

export const FacultyModel = mongoose.model('Faculty', FacultySchema);
