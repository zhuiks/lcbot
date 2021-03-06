import { SlideType } from "../types";
import Chord from "./chord";
import { IChordSlide } from ".";

class ChordSlide implements IChordSlide {
    readonly type: SlideType;
    readonly name: string;
    readonly lines: string[];
    readonly chords: Chord[][];

    constructor({ type = SlideType.VERSE, name = '', lines, chords }: IChordSlide) {
        this.type = type;
        this.name = name;
        this.lines = lines ? lines.map(line => line.replace(/\|:|:\|/g, '')): [' '];
        this.chords = chords || this.lines.map(line => {
            const pauseChord = new Chord({
                text: line,
            })
            return [pauseChord];
        });
    }
}

export default ChordSlide;