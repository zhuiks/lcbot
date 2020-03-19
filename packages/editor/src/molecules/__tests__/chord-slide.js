import { SlideType } from "../../__generated__/globalTypes";
import ChordSlide from "../chord-slide";

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

    it(`populates with "pause" chord`, () => {
        expect(Array.isArray(slide.chords)).toBeTruthy();
        expect(slide.chords).toHaveLength(slide.lines.length);
        for (let i = 0; i < slide.lines.length; i++) {
            expect(Array.isArray(slide.chords[i])).toBeTruthy();
            expect(slide.chords[i]).toHaveLength(1);
            expect(slide.chords[i][0]).toHaveProperty('rootNote');
            expect(slide.chords[i][0].rootNote).toEqual('*');
            expect(slide.chords[i][0]).toHaveProperty('duration');
            expect(slide.chords[i][0].duration).toEqual(slide.lines[i].length);
        }
    })

    it('adds chords in the begging', () => {
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