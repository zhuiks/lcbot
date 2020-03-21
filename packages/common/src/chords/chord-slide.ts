import { Record, List, fromJS } from "immutable";
import { SlideType } from "../types";
import Chord, { IChord } from "./chord";

interface IChordSlide {
    type: SlideType;
    name?: string;
    lines?: string[] | List<string>;
    chords?: [[{}]] | List<List<IChord>>;
}

interface IChordArgs {
    line: number;
    pos: number;
    chordData: IChord;
}

class ChordSlide extends Record({
    type: SlideType.VERSE,
    name: '',
    lines: List(),
    chords: List(),
}) /* implements IChordSlide */ {
    // readonly type!: SlideType;
    // readonly name!: string;
    // readonly lines!: List<string>;
    // readonly chords!: List<List<Chord>>;

    constructor({type = SlideType.VERSE, name, lines, chords}: IChordSlide) {
        const imLines = fromJS(lines);
        const imChords: List<List<IChord>> = chords 
            ? List(chords.map((line) => {
                return List(line.map((jsChord: IChord) => {
                    return new Chord(jsChord)
                }))
            }))
            : imLines.map((line: string) => {
                const pauseChord = new Chord({
                    text: line,
                })
                return List.of(pauseChord);
            });
        super({type, name, lines: imLines, chords: imChords});
    }


    getChord(line: number, pos: number) {
        const { chordIndex } = _getChordIndex(this, line, pos);
        return this.getIn(['chords', line, chordIndex]);
    }
}

export default ChordSlide;

const _getChordIndex = (slide: ChordSlide, line: number, pos: number) => {
    let charsLength = 0;
    const chordIndex = slide.getIn(['chords', line]).findIndex((chord: IChord) => {
        charsLength += [...chord.text].length;
        return charsLength > pos;
    });
    const charsFromTheEnd = pos - charsLength;
    return {
        chordIndex,
        charsFromTheEnd,
    }
}

export const addChord = (slide: ChordSlide, type: string, line: number, pos: number) => {
    if(!slide.lines.has(line) || !slide.chords.has(line)) {
        return slide;
    }
    if(!/^ADD_CHORD_[A-G]$/.test(type)) {
        return slide;
    }
    const chordData = {
        root: type.slice('ADD_CHORD_'.length)
    };
    const chordsLine = slide.getIn(['chords', line]);
    const {chordIndex, charsFromTheEnd} = _getChordIndex(slide, line, pos);
    const prevChordText = chordsLine.get(chordIndex).text.slice(0, charsFromTheEnd);
    const newChordText = chordsLine.get(chordIndex).text.slice(charsFromTheEnd);
    const newChordsLine = prevChordText.length === 0
        ? chordsLine.mergeIn([chordIndex], chordData)
        : chordsLine.mergeIn([chordIndex], {text: prevChordText})
            .insert(chordIndex+1, new Chord({...chordData, text: newChordText}));
    return slide.setIn(['chords', line], newChordsLine);
}
