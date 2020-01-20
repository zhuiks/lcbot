const {MongoClient} = require('mongodb');
const Songs = require('../songs');

const TEST_ID = 'some-song-id';
const MOCK_SONG = {title: 'Test Song', text: 'la-la-la', links: 'youtube'};

describe('[Songs]', () => {
  let connection;
  let db;
  let songs;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    db = await connection.db(process.env.MONGO_DB_NAME);
    songs = new Songs(db.collection('songs'));
    await songs.collection.deleteMany({title: MOCK_SONG.title})
  });

  afterEach(async() => {
    await songs.collection.deleteMany({title: MOCK_SONG.title})
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('runs & connects to DB', () => {
    expect(1).toBe(1);
    const songs = db.collection('songs');
    expect(songs).toBeTruthy();
  });

  it('should save a song', async () => {
    let mockSong1 = MOCK_SONG;
    mockSong1._id = TEST_ID
    await songs.saveSong(mockSong1);
    const insertedSong = await songs.collection.findOne({_id: TEST_ID});
    expect(insertedSong).toEqual(MOCK_SONG);
  });

  it('should read a song', async () => {
    let mockSong1 = MOCK_SONG;
    mockSong1._id = TEST_ID
    await songs.collection.insertOne(mockSong1);
    const existingSong = await songs.getSong(TEST_ID);
    expect(existingSong).toEqual(MOCK_SONG);
  });

  it('should read all songs', async () => {
    let mockSong1 = MOCK_SONG;
    mockSong1.text += '\n la-la';
    let mockSong2 = MOCK_SONG;
    mockSong2.text += '\n la-la-a-a';
    let mockSong3 = MOCK_SONG;
    mockSong3.text += '\n la-la-la-la';
    
    await songs.collection.insertMany([mockSong1, mockSong2, mockSong3]);
    const existingSongs = await songs.getAllSongs();
    expect(existingSongs.length).toEqual(3);
  });

});