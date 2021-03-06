import { SlideType } from '../../types';
import ChordSlide from '../chord-slide';
import chordAction from '../chord-action'

export const mockSlide = {
    type: SlideType.CHORUS,
    lines: [
        "Усі діла Твої звеличують Тебе",
        "Усе для Тебе і Тобою все живе!",
        "Усі ми створені в Тобі знайти усе",
        "Боже в Тобі усе!",
    ],
};



describe('Chord Slide', () => {
    let slide;
    beforeEach(() => {
        slide = new ChordSlide(mockSlide);
    });
    afterEach(() => {
        slide = null;
    });

    it('initialize from object', () => {
        expect(slide).toHaveProperty('type');
        expect(slide.type).toEqual(SlideType.CHORUS);
        expect(Array.isArray(slide.lines)).toEqual(true);
        expect(slide.lines.length).toEqual(4);
    })

    it(`populates with "pause" chord`, () => {
        expect(Array.isArray(slide.chords)).toEqual(true);
        expect(slide.chords.length).toEqual(slide.lines.length);
        for (let i = 0; i < slide.lines.size; i++) {
            const chordLine = slide.chords[i];
            expect(Array.isArray(chordLine)).toBeTruthy();
            expect(chordLine.size).toEqual(1);
            const chord = chordLine[0];
            expect(chord).toHaveProperty('bass');
            expect(chord.root).toEqual('_');
            expect(chord.text.length).toEqual(slide.lines[i].length);
        }
    })

    it('adds chord in the begging', () => {
        const line = 0;
        const index = 0;
        const offset = 1;
        const upSlide = chordAction(
            slide,
            'ADD_CHORD_C',
            line,
            index,
            offset
        );
        expect(upSlide).not.toEqual(slide);
        const upChordLine = upSlide.chords[line];
        expect(upChordLine.length).toEqual(1);
        const upChord = upSlide.chords[line][index];
        expect(upChord.root).toEqual('C');
        expect(upChord.text).toEqual(slide.lines[line]);
        const upSlide2 = chordAction(
            upSlide,
            'ADD_CHORD_F',
            line,
            0,
            offset
        );
        expect(upSlide2).not.toEqual(upSlide);
        expect(upSlide2).not.toEqual(slide);
        const upChord2 = upSlide2.chords[line][index];
        expect(upChord2.root).toEqual('F');
        expect(upChord2.text).toEqual(slide.lines[line]);
    })

    it('adds chord', () => {
        const line = 1;
        const upSlide = chordAction(
            slide,
            'ADD_CHORD_C',
            line,
            0,
            5
        );
        expect(upSlide).not.toEqual(slide);
        const upChordLine = upSlide.chords[line];
        expect(upChordLine).not.toEqual(slide.chords[line]);
        expect(upChordLine.length).toEqual(2);
        const upChord = upSlide.chords[line][1];
        expect(upChord.root).toEqual('C');
        expect(upSlide.chords[line][0].text).toEqual('Усе ');
        expect(upSlide.chords[line][1].text).toEqual('для Тебе і Тобою все живе!');

        const upSlide2 = chordAction(
            upSlide,
            'ADD_CHORD_F',
            line,
            1,
            12
        );
        expect(upSlide2.chords[line]).not.toEqual(upSlide.chords[line]);
        const upChord2 = upSlide2.chords[line][2];
        expect(upChord2.root).toEqual('F');
        expect(upChord2.text).toEqual('Тобою все живе!');

        const upSlide3 = chordAction(
            upSlide2,
            'ADD_CHORD_E',
            line,
            0,
            0
        );
        const upChord3 = upSlide3.chords[line][0];
        expect(upChord3.root).toEqual('E');
        expect(upChord3.text).toEqual('Усе ');
        expect(upSlide3.chords[line].length).toEqual(3);
    })

    it('adds chord in the end of the line', () => {
        const line = slide.lines.length - 1
        const offset = [...slide.lines[line]].length
        const upSlide = chordAction(
            slide,
            'ADD_CHORD_C',
            line,
            0,
            offset
        );
        const upChord = upSlide.chords[line][1];
        expect(upChord.root).toEqual('C');
        expect(upChord.text).toEqual('!');
    })

    xit('adds chord before line begins', ()=>{
        const line = 3;
        const offset = 0;
    })
    xit('adds chord after line ends', ()=>{
        const line = 3;
        const offset = [...slide.lines[line]].length+1;
        
    })
})