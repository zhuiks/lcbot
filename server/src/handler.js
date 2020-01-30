const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Songs = require('./datasources/songs-dynamodb');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  dataSources: () => {
    return {
     songs: new Songs()
  }}
});

module.exports.query = (event, context, callback) => {
  const handler = server.createHandler();

  // tell AWS lambda we do not want to wait for NodeJS event loop
  // to be empty in order to send the response
  context.callbackWaitsForEmptyEventLoop = false;

  // process the request
  return handler(event, context, callback);
};
