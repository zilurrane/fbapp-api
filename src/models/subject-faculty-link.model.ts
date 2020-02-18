import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SubjectFacultyLinkSchema = new Schema({
    subjectId: {
        type: String,
        required: 'Subject id is required',
    },
    facultyId: {
        type: String,
        required: 'Faculty id is required',
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

export const SubjectFacultyLinkModel = mongoose.model('SubjectFacultyLink', SubjectFacultyLinkSchema);
