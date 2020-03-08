import { Chord } from "../atoms/chord-span";
import { SlideInput, SlideType } from "../__generated__/globalTypes";

export interface ChordArgs {
    lineAt: number;
    charAt: number;
    chordData: any;
}

interface ChordSlideI extends SlideInput {
    chords: Chord[][];
    addChord: (args: ChordArgs) => boolean;
    modChord: (args: ChordArgs) => boolean;
    delChord: (args: ChordArgs) => boolean;
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
    }
    addChord: (args: ChordArgs) => boolean = ({ lineAt, charAt = 0, chordData = {} }) => {
        const insertIndex = charAt;
        this.chords[lineAt].splice(insertIndex, 0, chordData);
        return true;
    };
    modChord: (args: ChordArgs) => boolean = ({ lineAt, charAt = 0, chordData = {} }) => {
        return true;
    };
    delChord: (args: ChordArgs) => boolean = ({ lineAt, charAt = 0, chordData = {} }) => {
        return true;
    };

}

export default ChordSlide;