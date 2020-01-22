require('dotenv').config()

const dbClient = require('./datasources/db');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Songs = require('./datasources/songs');

let db;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  dataSources: () => {
    console.log(`getting dataSources; db=${db}`);
    return {
     songs: new Songs(db)
  }}
});

dbClient.connect()
.then((dbConnected) => {
  db = dbConnected;
  return server.listen();
})
.then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
