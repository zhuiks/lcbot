import Chord from "./chord";
import ChordSlide from "./chord-slide";
import { ZWJ } from "./chord-action";

const getChordIndex = (slide: ChordSlide, line: number, pos: number) => {
    let charsLength = 0;
    const lineLength = [...slide.lines[line]].length;
    pos = pos - 1;
    pos = pos >= lineLength ? lineLength - 1 : (pos < 0 ? 0 : pos);
    const chordsLine = slide.chords[line];
    const chordIndex = chordsLine.findIndex((chord: Chord) => {
        charsLength += [...chord.text].length;
        if (chord.text.startsWith(ZWJ)) {
            pos += 2;
            console.log('starts with ZWJ');
        }
        return charsLength > pos;
    });
    const charsFromTheEnd = pos - charsLength;
    return {
        chordIndex,
        charsLength,
        charsFromTheEnd,
    };
};

export default getChordIndex;
