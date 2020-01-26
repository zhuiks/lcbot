const { ObjectId } = require('mongodb');
const { MongoDataSource } = require('apollo-datasource-mongodb');

class Songs extends MongoDataSource {
  constructor(db) {
    if(!db || !db.collection) {
      throw new Error('DB is not connected... :(');
    }
    super(db.collection('songs'));
  }
  
  async getAllSongs() {
    const results = await this.collection.find().toArray();
    return results.map(song => this.songPretifier(song));
  }

  async getSong(songId) {
    const song = await this.collection.findOne({ _id: new ObjectId(songId) });
    console.log(`Fetched a song(${songId}): ${JSON.stringify(song)}`);
    return this.songPretifier(song);
  }

  async saveSong (song) {
    const r = await this.collection.insertOne(song);
    console.log(`Song saved successfully: ${r.insertedId}`)
    return r.insertedId;
  }

  songPretifier (song) {
    return {
      id: song._id,
      title: song.title,
      text: song.text,
      links: song.links,
      url: "www.todo"
    };
  }
}

module.exports = Songs;
