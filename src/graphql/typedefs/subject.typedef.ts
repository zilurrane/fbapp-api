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
    type Query {
        subjects: [Subject]
        subject(id: ID!): Subject
    }
`;
