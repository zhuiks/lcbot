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

    describe('Adding chord', () => {
        it('in the begging', () => {
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
            slide.addChord({
                lineAt,
                charAt,
                chordData: {
                    rootNote: 'A',
                }
            });
            expect(slide.chords[lineAt]).toHaveLength(2);
            expect(slide.chords[lineAt][0].rootNote).toEqual('A');
        })

    })
})