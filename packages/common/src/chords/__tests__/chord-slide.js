import { SlideType } from '../../types';
import ChordSlide from '../chord-slide';
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

    it('initialize from object', ()=>{
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
            expect(chord.root).toEqual('*');
            expect(chord.text.length).toEqual(slide.lines.get(i).length);
        }
    })

    xit('adds chords in the begging', () => {
        const lineAt = 0;
        const charAt = 0;
        slide.addChord({
            lineAt,
            charAt,
            chordData: {
                rootNote: 'C',
            }
        });
        expect(slide.chords[lineAt]).toHaveLength(1);
        expect(slide.chords[lineAt][0].rootNote).toEqual('C');
        expect(slide.chords[lineAt][0].duration).toEqual(slide.lines[lineAt].length);
        slide.addChord({
            lineAt,
            charAt,
            chordData: {
                rootNote: 'A',
            }
        });
        expect(slide.chords[lineAt]).toHaveLength(1);
        expect(slide.chords[lineAt][0].rootNote).toEqual('A');
    })
})