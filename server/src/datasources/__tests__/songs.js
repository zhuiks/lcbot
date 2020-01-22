const dbClient = require('../db');
const Songs = require('../songs');

const TEST_ID = 'some-song-id';
const MOCK_SONG = {title: 'Test Song', text: 'la-la-la', links: 'youtube'};

describe('[Songs]', () => {
  // let connection;
  let db;
  let songs;

  beforeAll(async () => {
    db = await dbClient.connect();
    songs = new Songs(db);
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
    expect(songs.collection).toBeTruthy();
  });

  it('should save a song', async () => {
    const mockSong1 = { ...MOCK_SONG, ...{_id: TEST_ID} };
    expect(MOCK_SONG._id).not.toBeDefined();
    
    await songs.saveSong(mockSong1);
    const insertedSong = await songs.collection.findOne({_id: TEST_ID});
    expect(insertedSong).toEqual(mockSong1);
  });

  it('should read a song', async () => {
    const mockSong1 = { ...MOCK_SONG, ...{_id: TEST_ID} };

    await songs.collection.insertOne(mockSong1);
    const existingSong = await songs.getSong(TEST_ID);
    expect(existingSong).toEqual(mockSong1);
  });

  it('should read all songs', async () => {
    const mockSong1 = { ...MOCK_SONG, ...{text: 'la-la-la\n la-la'} };
    const mockSong2 = { ...MOCK_SONG, ...{text: 'la-la\n la-la-a-a'} };
    const mockSong3 = { ...MOCK_SONG, ...{text: 'o-o-o\n la-la-la-la'} };
    
    await songs.collection.insertMany([mockSong1, mockSong2, mockSong3]);
    const existingSongs = await songs.getAllSongs();
    expect(existingSongs.length).toEqual(3);
  });

});