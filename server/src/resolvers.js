module.exports = {
  Query: {
    songs: (_, __, { dataSources }) =>
      dataSources.songs.getAllSongs(),
    song: (_, { id }, { dataSources }) =>
      dataSources.songs.getSong({ songId: id })
    },
  Mutation: {
      saveSong: async (_, {title, text, links}, { dataSources }) => {
        return dataSources.songs.saveSong({title, text, links});      
      }
  }
};  