import { Record } from 'immutable';

export const REST_CHAR = '*';

export interface IChord {
    root: string;
    type?: string;
    option?: string;
    bass?: string;
    text: string;
}

const Chord  = Record({
    root: REST_CHAR,
    type: '',
    option: '',
    bass: '',
    text: ' ',
});

export default Chord;