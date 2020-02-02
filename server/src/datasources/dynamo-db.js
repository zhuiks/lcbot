const AWS = require('aws-sdk');
const stringGen = require('crypto-random-string');

let _db;

const _promisify = async (foo) => {
    return new Promise((resolve, reject) => {
        foo((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

class Database {
    async connect() {
        if (!this.dynamoDb) {
            let params = {};
            if (process.env.IS_OFFLINE) {
                params = {
                    endpoint: 'http://localhost:8000',
                    region: 'localhost',
                };
            }

            this.dynamoDb = new AWS.DynamoDB.DocumentClient(params);

            // if (__DEV__) {
            //     // will create tables through lambda only in development
            //     await this.createTables(tables);
            // }
        }

        return this.dynamoDb;
    }

    async get(SongId) {
        return _promisify(callback =>
            this.dynamoDb.get({
                TableName: process.env.DYNAMODB_TABLE,
                Key: { SongId },
            }, callback))
            .then((result) => {
                if (!result.Item) {
                    return null;
                }
                return result.Item;
            })
    }

    async update(data) {
        const SongId = data.SongId || stringGen({ length: 5, type: 'url-safe' });
        console.log(data.text.length);
        return _promisify(callback =>
            this.dynamoDb.update({
                TableName: process.env.DYNAMODB_TABLE,
                Key: { SongId },
                UpdateExpression: 'SET #L = :lang, #T = :title, #Txt = :txt, #U = :links',
                ExpressionAttributeNames: {
                    '#L': 'lang',
                    '#T': 'title',
                    '#Txt': 'text',
                    '#U': 'links',
                },
                ExpressionAttributeValues: {
                    ':lang': 'ar',
                    ':title': data.title ? data.title.toString() : '',
                    ':txt': data.text,
                    ':links': data.links,
                },
                ReturnValues: "ALL_NEW",
            }, callback))
            .then((result) => {
                if (!result.Attributes) {
                    return null;
                }
                return result.Attributes;
            })
    }

    async query(params) {
        return _promisify(callback =>
            this.dynamoDb.scan({
                TableName: process.env.DYNAMODB_TABLE,
                FilterExpression: 'lang = :lang',
                ExpressionAttributeValues: { ':lang': 'ar' }
            }, callback))
            .then((result) => {
                if (!result.Items) {
                    return [];
                }
                return result.Items;
            })
    }
}

const getDatabase = async () => {
    if (!_db) {
        _db = new Database();
        await _db.connect();
    }

    return _db;
}

module.exports = getDatabase;