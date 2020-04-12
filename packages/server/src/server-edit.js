const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Songs = require('./datasources/songs-dynamodb');

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  dataSources: () => {
    return {
      songs: new Songs()
    }
  }
});
