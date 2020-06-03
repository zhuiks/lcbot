import { ApolloServer } from 'apollo-server-lambda';
import typeDefs from './schema';
import resolvers from './resolvers';
import Songs from './datasources/songs-dynamodb';

const serverEdit = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  dataSources: () => {
    return {
      songs: new Songs()
    };
  }
});

export default serverEdit;