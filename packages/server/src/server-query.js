import { ApolloServer } from 'apollo-server-lambda';
import typeDefs from './schema';
import resolvers from './resolvers';
import Songs from './datasources/songs-dynamodb';

const serverQuery = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: resolvers.Query,
    Song: resolvers.Song,
  },
  tracing: true,
  dataSources: () => {
    return {
      songs: new Songs()
    };
  }
});

export default serverQuery;