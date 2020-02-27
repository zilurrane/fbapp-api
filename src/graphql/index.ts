import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typedefs/index.typedef';
import resolvers from './resolvers/index.resolver';

export default new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});
