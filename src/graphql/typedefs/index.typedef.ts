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
    type User {
        id: ID!
        userName: String
        password: String
        role: Int
        email: String
        isActive: Boolean
        createdDate: Date
    }
    type Student {
        id: ID!
        user: User
        rollNumber: Int
        name: String
        departmentCode: String
        classCode: String
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
    type Faculty {
        id: ID!
        name: String!
        email: String!
        qualification: String
        departmentCode: String
        classCode: String
        isActive: Boolean
        createdDate: Date
    }
    type SubjectFaculty {
        subjects: [Subject]
        isFeedbackSubmitted: Boolean
        faculty: Faculty
    }
    type FeedbackSummary {
        actual: Int
        expected: Int
        percentage: Float
    }
    type FacultyFeedbackSummary {
        feedback: FeedbackSummary
        faculty: Faculty
    }
    type FacultyFeedback {
        parameter: FeedbackParameter
        feedback: FeedbackSummary
    }
    type Query {
        subjects: [Subject]
        subject(id: ID!): Subject
        students: [Student]
        studentsByDepartmentCodeClassCode(departmentCode: String, classCode: String): [Student]
        feedbackParameters: [FeedbackParameter]
        facultiesByDepartmentCodeClassCode(departmentCode: String, classCode: String, studentId: ID): [SubjectFaculty]
        facultiesFeedbackSummary(departmentCode: String, classCode: String): [FacultyFeedbackSummary]
        facultyFeedback(departmentCode: String, classCode: String, facultyId: ID): [FacultyFeedback]
    }
    type Mutation {
        addFeedbackParameter(code: String!, question: String!, type: String!, marks: Int!, options: [FeedbackParameterOptionsInput]): FeedbackParameter
    }
`;
