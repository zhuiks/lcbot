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
    const song = await this.collection.findOne({ _id: songId });
    console.log(`Fetched a song(${songId}): ${JSON.stringify(song)}`)
    song.id = song._id;
    return song
  }

  async saveSong (song) {
    const r = await this.collection.insertOne(song);
    console.log(`Song saved successfully: ${r.insertedId}`)
    return r.insertedId;
  }
}

module.exports = Songs;
