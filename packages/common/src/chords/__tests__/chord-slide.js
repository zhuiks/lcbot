import { SlideType } from '../../types';
import ChordSlide, { modChord } from '../chord-slide';
import { List, Record } from 'immutable';

const mockSlide = {
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
        expect(List.isList(slide.lines)).toEqual(true);
        expect(slide.lines.size).toEqual(4);
    })

    it(`populates with "pause" chord`, () => {
        expect(List.isList(slide.chords)).toEqual(true);
        expect(slide.chords.size).toEqual(slide.lines.size);
        for (let i = 0; i < slide.lines.size; i++) {
            const chordLine = slide.chords.get(i);
            expect(List.isList(chordLine)).toBeTruthy();
            expect(chordLine.size).toEqual(1);
            const chord = chordLine.get(0);
            expect(Record.isRecord(chord)).toEqual(true);
            expect(chord.root).toEqual(' ');
            expect(chord.text.length).toEqual(slide.lines.get(i).length);
        }
    })

    it('adds chord in the begging', () => {
        const line = 0;
        const pos = 0;
        const upSlide = modChord(
            slide,
            'ADD_CHORD_C',
            line,
            pos
        );
        expect(upSlide).not.toEqual(slide);
        const upChordLine = upSlide.chords.get(line);
        expect(upChordLine.size).toEqual(1);
        const upChord = upSlide.chords.getIn([line, pos]);
        expect(upChord.root).toEqual('C');
        expect(upChord.text).toEqual(slide.lines.get(line));
        const upSlide2 = modChord(
            upSlide,
            'ADD_CHORD_F',
            line,
            pos
        );
        expect(upSlide2).not.toEqual(upSlide);
        expect(upSlide2).not.toEqual(slide);
        const upChord2 = upSlide2.chords.getIn([line, pos]);
        expect(upChord2.root).toEqual('F');
        expect(upChord2.text).toEqual(slide.lines.get(line));
    })

    it('adds chord', () => {
        const line = 1;
        const upSlide = modChord(
            slide,
            'ADD_CHORD_C',
            line,
            5
        );
        expect(upSlide).not.toEqual(slide);
        const upChordLine = upSlide.chords.get(line);
        expect(upChordLine).not.toEqual(slide.chords.get(line));
        expect(upChordLine.size).toEqual(2);
        const upChord = upSlide.chords.getIn([line, 1]);
        expect(upChord.root).toEqual('C');
        expect(upSlide.chords.getIn([line, 0]).text).toEqual('Усе д');

        const upSlide2 = modChord(
            upSlide,
            'ADD_CHORD_F',
            line,
            15
        );
        expect(upSlide2.chords.get(line)).not.toEqual(upSlide.chords.get(line));
        const upChord2 = upSlide2.chords.getIn([line, 2]);
        expect(upChord2.root).toEqual('F');
        expect(upChord2.text).toEqual('Тобою все живе!');

        const upSlide3 = modChord(
            upSlide2,
            'ADD_CHORD_E',
            line,
            0
        );
        const upChord3 = upSlide3.chords.getIn([line, 0]);
        expect(upChord3.root).toEqual('E');
        expect(upChord3.text).toEqual('Усе д');
        expect(upSlide3.chords.get(line).size).toEqual(3);
    })

})