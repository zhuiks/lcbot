const resolvers = {
  Query: {
    songs: (_, __, { dataSources }) =>
      dataSources.songs.getAllSongs(),
    song: (_, { id }, { dataSources }) =>
      dataSources.songs.getSong(id)
  },
  Mutation: {
    addSong: async (_, { id, title, slides, links }, { dataSources }) => {
      const songId = await dataSources.songs.addSong({ id, title, slides, links });
      const song = await dataSources.songs.getSong(songId);
      return {
        success: songId != false && song.id != false,
        song,
        message:
          songId != false && song.id != false
            ? "Song added successfully"
            : "Something went wrong while adding the song"
      };
    },
    updateSong: async (_, { id, title, slides, links }, { dataSources }) => {
      const songId = await dataSources.songs.updateSong({ id, title, slides, links });
      const song = await dataSources.songs.getSong(songId);
      return {
        success: songId != false && song.id != false,
        song,
        message:
          songId != false && song.id != false
            ? "Song updated successfully"
            : "Something went wrong while updating the song"
      };
    },
  },
  Song: {
    text: (songDb) => {
      if (songDb.text)
        return songDb.text;
      let lines = [];
      songDb.slides.forEach(slide => {
        lines.push(' ', '    ' + (slide.name || slide.type));
        lines = lines.concat(slide.lines);
      });
      return lines.slice(1);
    },
    hasChords: (songDb) => {
      if (!songDb.slides) return false
      return songDb.slides.find(slide => (
        slide.chords && slide.chords.find((chordsLine) => (
          chordsLine.length && (chordsLine.length > 1 || chordsLine[0].root !== "_")
        )) !== undefined)
      ) !== undefined
    }
  }
};
export default resolvers;