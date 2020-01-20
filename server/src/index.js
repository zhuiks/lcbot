require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  const db = client.db(process.env.MONGO_DB_NAME);
  console.log(`Connected successfully to MongoDB -> ${process.env.MONGO_DB_NAME}`);
  client.close();
});


const Songs = require('./datasources/songs')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    songs: new Songs(db.collection('songs'))
    // OR
    // users: new Users(UserModel)
  })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });