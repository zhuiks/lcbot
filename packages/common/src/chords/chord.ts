import { Record } from 'immutable';

export const REST_CHAR = '*';

export interface IChord {
    root: string;
    quality?: string;
    type?: string;
    bass?: string;
    text: string;
}

const Chord  = Record({
    root: REST_CHAR,
    quality: '',
    type: '',
    bass: '',
    text: ' ',
});

export default Chord;