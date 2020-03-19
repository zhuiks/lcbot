import { Record } from 'immutable';

export interface IChord {
    root: string;
    type?: string;
    option?: string;
    bass?: string;
    text: string;
}

const Chord  = Record({
    root: '*',
    type: '',
    option: '',
    bass: '',
    text: ' ',
});

export default Chord;