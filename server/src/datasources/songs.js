const { MongoDataSource } = require('apollo-datasource-mongodb');

class Songs extends MongoDataSource {
  constructor(db) {
    if(!db || !db.collection) {
      throw new Error('DB is not connected... :(');
    }
    super(db.collection('songs'));
  }
  
  async getAllSongs() {
    return this.collection.find().toArray();
  }

  async getSong(songId) {
    return this.collection.findOne({_id: songId})
  }

  async saveSong (song) {
    return this.collection.insertOne(song);
  }
}

module.exports = Songs;
