const getDb = require('./dynamo-db');

class Songs {
    async getAllSongs() {
        const db = await getDb();
        const results = await db.query({});
        return results.map(song => this._songPretifier(song));
    }

    async getSong(songId) {
        const db = await getDb();
        const song = await db.get(songId);
        return this._songPretifier(song);
    }

    async saveSong(song) {
        const db = await getDb();
        const r = await db.update(song);
        return r.SongId;
    }

    _songPretifier(songDb) {
        return {
            id: songDb.SongId,
            title: songDb.Title,
            text: songDb.Text,
            links: songDb.Links
        };
    }
}

module.exports = Songs;