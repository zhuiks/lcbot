const { MongoDataSource } = require('apollo-datasource-mongodb');

class Songs extends MongoDataSource {
  getAllSongs() {
    return this.collection.find();
  }

  getSong(songId) {
    return this.collection.findOne({_id: songId})
  }

  saveSong (song) {
    this.collection.insertOne(song);
  }
}

module.exports = Songs;
