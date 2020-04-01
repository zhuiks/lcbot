import Chord from "../chord";

describe('Chord', () => {

    it(`works`, () => {
        const lyrics = 'lalaa';
        const chordFs = new Chord({root: 'F#', text: lyrics});
        expect(chordFs).toHaveProperty('root');
        expect(chordFs).toHaveProperty('quality');
    })

})