import { ApolloServer, gql } from 'apollo-server-express';
import { SubjectModel } from '../models/subject.model';
import DateScalar from './scalars/date';

const typeDefs = gql`
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

const resolvers = {
    Date: DateScalar,
    Query: {
        subjects: async () => await SubjectModel.find({}).exec(),
        subject: async (_parent: any, { id }: any) => await SubjectModel.findById(id).exec()
    }
};

export default new ApolloServer({ typeDefs, resolvers });
