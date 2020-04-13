import { SlideType } from "../types";
import Chord from "./chord";

export interface IChordSlide {
    type?: SlideType;
    name?: string;
    lines?: string[];
    chords?: Chord[][];
}

class ChordSlide implements IChordSlide {
    readonly type: SlideType;
    readonly name: string;
    readonly lines: string[];
    readonly chords: Chord[][];

    constructor({ type = SlideType.VERSE, name = '', lines, chords }: IChordSlide) {
        this.type = type;
        this.name = name;
        this.lines = lines || [' '];
        this.chords = chords || this.lines.map((line: string) => {
            const pauseChord = new Chord({
                text: line,
            })
            return [pauseChord];
        });
    }
}

export default ChordSlide;