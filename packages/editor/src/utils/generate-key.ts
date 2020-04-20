import stringGen from 'crypto-random-string';

//https://github.com/facebook/draft-js/blob/master/src/model/keys/generateRandomKey.js
const seenKeys = {
    blockId: {},
    songId: {},
};

const MULTIPLIER = Math.pow(2, 24);

const generateKey = (type: 'blockId' | 'songId' = 'blockId', usedValues = {}) => {
    let key;
    seenKeys[type] = { ...seenKeys[type], ...usedValues };
    if(type === 'songId') {
        while (key === undefined || seenKeys[type].hasOwnProperty(key)) {
            key = stringGen({ length: 6, type: 'distinguishable' }).toLowerCase();
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