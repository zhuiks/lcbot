module.exports = {
  Query: {
    songs: (_, __, { dataSources }) =>
      dataSources.songs.getAllSongs(),
    song: (_, { songId }, { dataSources }) =>
      dataSources.songs.getSong(songId)
    },
  Mutation: {
      saveSong: async (_, {title, text, links}, { dataSources }) => {
        return dataSources.songs.saveSong({title, text, links});      
      }
  }
};  