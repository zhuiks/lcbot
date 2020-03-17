import {Record} from 'immutable';
import Chord from "../chord";

describe('Chord', () => {

    it(`works`, () => {
        const lyrics = 'lalaa';
        const chordFs = new Chord({rootNote: 'F#', text: lyrics});
        expect(chordFs instanceof Record ).toEqual(true);
    })

})