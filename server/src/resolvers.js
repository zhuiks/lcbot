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
  },
  Song: {
    text: (songDb) => {
      if(songDb.text)
        return songDb.text;
      let lines = [];
      songDb.slides.forEach(slide => {
        lines.push(' ', '    ' + (slide.name || slide.type));
        lines = lines.concat(slide.lines);
      });
      return lines.slice(1);  
    }
  }
};  