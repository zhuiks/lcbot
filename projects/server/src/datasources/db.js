const MongoClient = require('mongodb').MongoClient;

let db = null;

const connect = async function () {
  if (db === null) {
    // Connection URL
    const url = process.env.MONGO_URL;
    // Database Name
    const dbName = process.env.MONGO_DB_NAME;
    const opt = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    console.log(`...trying to connect to MongoDB`);

    try {
      // Use connect method to connect to the Server
      const connection = await MongoClient.connect(process.env.MONGO_URL, opt);
      db = connection.db(dbName);
      console.log(`Connected to MongoDB`);
    } catch (err) {
      console.log(err.stack);
    }
  }
  return db;
  //client.close();
};

module.exports = { connect };