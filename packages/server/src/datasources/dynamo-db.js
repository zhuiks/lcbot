import AWS from 'aws-sdk';

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
                    logger: console,
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
            });
    }

    async update(data) {
        const SongId = data.id || '__no-id-temp';
        let updateExpr = [];
        let attrNames = {};
        let attrVal = {};
        if (true || data.lang) {
            updateExpr.push('#L = :lang');
            attrNames['#L'] = 'Lang';
            attrVal[':lang'] = 'ar';
        }
        const title = data.title && data.title.toString().trim();
        if (title && title.length) {
            updateExpr.push('#T = :title');
            attrNames['#T'] = 'Title';
            attrVal[':title'] = title;
        }
        if (data.slides) {
            if(data.slides.length) {
                updateExpr.push('#Slides = :slides');
                attrNames['#Slides'] = 'Slides';
                attrVal[':slides'] = data.slides;
            }
            // const text = typeof data.text === 'string'
            //     ? [data.text]
            //     : Array.from(data.text, s => s.toString().trim());
            // if (text.length) {
            //     updateExpr.push('#Txt = :txt');
            //     attrNames['#Txt'] = 'Text';
            //     attrVal[':txt'] = text.map(s => s.length === 0 ? " " : s);
            // }
        }
        if (data.links) {
            const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}' + // domain name
                // '|((\\d{1,3}\\.){3}\\d{1,3})' + // OR ip (v4) address
                ')(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            const links = (typeof data.links === 'string'
                ? [data.links]
                : Array.from(data.links, s => s.toString().trim())).filter(s => !!pattern.test(s));
            if (links.length) {
                updateExpr.push('#U = list_append(if_not_exists(#U,:empty), :links)');
                attrNames['#U'] = 'Links';
                attrVal[':links'] = links;
                attrVal[':empty'] = [];
            }
        }
        if(updateExpr.length === 0) {
            return null;
        }
        return _promisify(callback =>
            this.dynamoDb.update({
                TableName: process.env.DYNAMODB_TABLE,
                Key: { SongId },
                UpdateExpression: 'SET ' + updateExpr.join(),
                ExpressionAttributeNames: attrNames,
                ExpressionAttributeValues: attrVal,
                ReturnValues: "ALL_NEW",
            }, callback))
            .then((result) => {
                if (!result.Attributes) {
                    return null;
                }
                return result.Attributes;
            });
    }

    async query(params) {
        return _promisify(callback =>
            this.dynamoDb.scan({
                TableName: process.env.DYNAMODB_TABLE,
                FilterExpression: 'Lang = :lang',
                ExpressionAttributeValues: { ':lang': 'ar' }
            }, callback))
            .then((result) => {
                if (!result.Items) {
                    return [];
                }
                return result.Items;
            });
    }
}

const getDb = async () => {
    if (!_db) {
        _db = new Database();
        await _db.connect();
    }

    return _db;
};

export default getDb;