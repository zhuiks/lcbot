const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'lyrics';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});


const Songs = require('./datasources/songs')

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    songs: new Songs(db.collection('songs'))
    // OR
    // users: new Users(UserModel)
  })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });