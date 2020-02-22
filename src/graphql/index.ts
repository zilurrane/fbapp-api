import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!'
    }
};

export default new ApolloServer({ typeDefs, resolvers });
