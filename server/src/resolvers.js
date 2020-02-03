module.exports = {
  Query: {
    songs: (_, __, { dataSources }) =>
      dataSources.songs.getAllSongs(),
    song: (_, { id }, { dataSources }) =>
      dataSources.songs.getSong(id)
  },
  Mutation: {
    saveSong: async (_, { title, text, links }, { dataSources }) => {
      const songId = await dataSources.songs.saveSong({ title, text, links });
      const song = await dataSources.songs.getSong(songId);
      return {
        success: songId != false && song.id != false,
        song,
        message:
          songId != false && song.id != false
            ? "Song saved successfully"
            : "Something went wrong"
      }
    }
  }
};  