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

    addChord({line, pos, chordData}: IChordArgs) {
        if(!this.lines.has(line) || !this.chords.has(line)) {
            return this;
        }
        const chordsLine = this.getIn(['chords', line]);
        const {chordIndex, charsFromTheEnd} = this._getChordIndex(line, pos);
        const prevChordText = chordsLine.get(chordIndex).text.slice(0, charsFromTheEnd);
        const newChordText = chordsLine.get(chordIndex).text.slice(charsFromTheEnd);
        const newChordsLine = prevChordText.length === 0
            ? chordsLine.mergeIn([chordIndex], chordData)
            : chordsLine.mergeIn([chordIndex], {text: prevChordText})
                .insert(chordIndex+1, new Chord({...chordData, text: newChordText}));
        return this.setIn(['chords', line], newChordsLine);
    }

    _getChordIndex(line: number, pos: number) {
        let charsLength = 0;
        const chordIndex = this.getIn(['chords', line]).findIndex((chord: IChord) => {
            charsLength += [...chord.text].length;
            return charsLength > pos;
        });
        const charsFromTheEnd = pos - charsLength;
        return {
            chordIndex,
            charsFromTheEnd
        }
    }

    getChord(line: number, pos: number) {
        const { chordIndex } = this._getChordIndex(line, pos);
        return this.getIn(['chords', line, chordIndex]);
    }
}

export default ChordSlide;