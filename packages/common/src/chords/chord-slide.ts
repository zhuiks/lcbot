import { Record, List, fromJS } from "immutable";
import { SlideType } from "../types";
import Chord from "./chord";

interface IChordSlide {
    type: SlideType;
    name?: string;
    lines?: string[];
    chords?: [{}];
}

class ChordSlide extends Record({
    type: SlideType.VERSE,
    name: '',
    lines: List(),
    chords: List(),
}) {
    constructor({type, name, lines, chords}: IChordSlide) {
        const imLines = fromJS(lines);
        const imChords: List = chords 
            ? fromJS(chords)
            : imLines.map((line: string) => {
                const pauseChord = new Chord({
                    text: line,
                })
                return List.of(pauseChord);
            });
        super({type, name, lines: imLines, chords: imChords});
    }
}

export default ChordSlide;