const getDb = require('./dynamo-db');

class Songs {
    async getAllSongs() {
        const results = await getDb().query({});
        return results; //results.map(song => this.songPretifier(song));
    }

    async getSong(songId) {
        const song = await getDb().get(songId);
        return song; //this.songPretifier(song);
    }

    async saveSong(song) {
        const r = await getDb().update(song);
        return r.SongId;
    }



    async getForCharacter(id) {
        const db = await this.getDatabase();
        const result = await db.scan({
            TableName: 'weapon',
            ExpressionAttributeValues: {
                ':cId': {
                    S: id,
                },
            },
            FilterExpression: 'contains(characters, :cId)',
        });

        if (result && result.Items) {
            // need to "decode" the items, i know this is annoying
            return result.Items.map((item) => {

                const p = item.parameters ? item.parameters.M : {};
                const parameters = [];
                Object.keys(p).forEach((k) => {
                    parameters.push({
                        name: k,
                        value: p[k].S,
                    });
                });

                return {
                    name: item.name.S,
                    damage: item.damage.N,
                    id: item.id.S,
                    type: item.type.S,
                    parameters,
                };
            });
        }

        return [];
    }

    async delete(id) {
        const db = await this.getDatabase();
        await db.deleteItem({
            TableName: 'weapon',
            Key: {
                id: {
                    S: id.toString(),
                },
            },
        });
    }

}

module.exports = Songs;