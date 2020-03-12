import stringGen from 'crypto-random-string';

//https://github.com/facebook/draft-js/blob/master/src/model/keys/generateRandomKey.js
const seenKeys = {
    blockId: {},
    songId: {},
};

const MULTIPLIER = Math.pow(2, 24);

const generateKey = (type: 'blockId' | 'songId' = 'blockId', usedValues = {}) => {
    let key = 'none';
    seenKeys[type] = { ...seenKeys[type], ...usedValues };
    if(type === 'songId') {
        while (seenKeys[type].hasOwnProperty(key)) {
            key = stringGen({ length: 5, type: 'url-safe' });
        }
    } else {
            while (key === undefined || seenKeys[type].hasOwnProperty(key) || !isNaN(+key)) {
                key = Math.floor(Math.random() * MULTIPLIER).toString(32);
            }
    }
    seenKeys[type][key] = true;
    return key;
}

export default generateKey;