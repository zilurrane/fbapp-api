import { gql } from 'apollo-server-express';

export default gql`
    scalar Date
    type Subject {
        id: ID!
        code: String
        name: String
        departmentCode: String
        classCode: String
        parameters: [String]
        isActive: Boolean
        createdDate: Date
    }
    type Student {
        id: ID!
        rollNumber: Int
        userName: String
        password: String
        name: String
        email: String
        departmentCode: String
        classCode: String
        isActive: Boolean
        createdDate: Date
    }
    type FeedbackParameterOptions {
        value: String,
        label: String
    }
    input FeedbackParameterOptionsInput {
        value: String,
        label: String
    }
    type FeedbackParameter {
        id: ID!
        code: String
        question: String
        type: String
        marks: Int
        isActive: Boolean
        createdDate: Date
        options: [FeedbackParameterOptions]
    }
    type Query {
        subjects: [Subject]
        subject(id: ID!): Subject
        students: [Student]
        studentsByDepartmentCodeClassCode(departmentCode: String, classCode: String): [Student]
        feedbackParameters: [FeedbackParameter]
    }
    type Mutation {
        addFeedbackParameter(code: String!, question: String!, type: String!, marks: Int!, options: [FeedbackParameterOptionsInput]): FeedbackParameter
    }
`;
