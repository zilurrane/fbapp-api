import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FeedbackParameterSchema = new Schema({
    code: {
        type: String,
        required: 'Code is required',
        unique: true
    },
    question: {
        type: String,
        required: 'Question is required',
        unique: true
    },
    type: {
        type: String,
        required: 'Type is required',
    },
    options: [{
        value: String,
        label: String
    }],
    marks: {
        type: Number,
        required: 'Marks are required',
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

export const FeedbackParameterModel = mongoose.model('FeedbackParameter', FeedbackParameterSchema);
