import getDb from './dynamo-db';

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

    async addSong(song) {
        const db = await getDb();
        const r = await db.update(song);
        return r.SongId;
    }

    async updateSong(song) {
        const db = await getDb();
        const r = await db.update(song);
        return r.SongId;
    }

    _songPretifier(songDb) {
        return {
            id: songDb.SongId,
            title: songDb.Title,
            text: songDb.Text,
            slides: songDb.Slides,
            links: songDb.Links
        };
    }
}

export default Songs;