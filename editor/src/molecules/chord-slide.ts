import { Chord } from "../atoms/chord-span";
import { SlideInput, SlideType } from "../__generated__/globalTypes";

export interface ChordArgs {
    line: number;
    pos: number;
    chordData: any;
}

interface ChordSlideI extends SlideInput {
    chords: Chord[][];
    addChord: (args: ChordArgs) => ChordSlideI;
    modChord: (args: ChordArgs) => ChordSlideI;
    delChord: (args: ChordArgs) => ChordSlideI;
}

class ChordSlide implements ChordSlideI {
    chords: Chord[][] = [[]];
    type: SlideType = SlideType.VERSE;
    name?: string | null;
    lines?: string[] | null;
    constructor(slide: SlideInput) {
        this.type = slide.type;
        this.name = slide.name;
        this.lines = slide.lines;
        this.chords = Array(slide.lines?.length || 1).fill([]);
    }
    addChord: (args: ChordArgs) => ChordSlideI = ({ line, pos = 0, chordData = {} }) => {
        const insertIndex = pos;
        this.chords[line].splice(insertIndex, 0, chordData);
        return this;
    };
    modChord: (args: ChordArgs) => ChordSlideI = ({ line, pos = 0, chordData = {} }) => {
        return this;
    };
    delChord: (args: ChordArgs) => ChordSlideI = ({ line, pos = 0, chordData = {} }) => {
        return this;
    };

}

export default ChordSlide;