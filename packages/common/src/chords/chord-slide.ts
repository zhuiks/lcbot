import { Record, List, fromJS } from "immutable";
import { SlideType } from "../types";
import Chord, { IChord, REST_CHAR } from "./chord";

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

    constructor({ type = SlideType.VERSE, name, lines, chords }: IChordSlide) {
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
        super({ type, name, lines: imLines, chords: imChords });
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

export const modChord = (slide: ChordSlide, type: string, line: number, pos: number) => {
    if (!slide.lines.has(line) || !slide.chords.has(line)) {
        return slide;
    }
    let chordData;
    const modType = type.slice(0, 'ADD_CHORD'.length); //first part
    const data = type.slice('ADD_CHORD_'.length);  //second part
    switch (modType) {
        case 'ADD_CHORD':
            chordData = {
                root: data === '_' ? REST_CHAR : data.toUpperCase()
            };
            break;
        case 'MOD_CHORD':
            let chordType = '';
            switch (data) {
                case 'MIN':
                    chordType = 'm';
                    break;
                case 'DIM':
                    chordType = 'dim';
                    break;
                case 'AUG':
                    chordType = 'aug';
                    break;
            }
            chordData = {
                type: chordType,
            }
            break;
        case 'OPT_CHORD':
            let chordOption = '';
            switch (data) {
                case 'SUS':
                    chordOption = 'sus';
                    break;
                case '7':
                    chordOption = '7';
                    break;
                case '2':
                    chordOption = '2';
                    break;
            }
            chordData = {
                option: chordOption,
            }
            break;
        default:
            return slide;
    }
    const chordsLine = slide.getIn(['chords', line]);
    const { chordIndex, charsFromTheEnd } = _getChordIndex(slide, line, pos);
    const prevChordText = chordsLine.get(chordIndex).text.slice(0, charsFromTheEnd);

    const modChordData = modType === 'ADD_CHORD' && prevChordText.length !== 0
        ? { text: prevChordText }
        : chordData;

    let newChordsLine = chordsLine.mergeIn([chordIndex], modChordData);
    if (modType === 'ADD_CHORD' && prevChordText.length !== 0) {    
        chordData = {
            ...chordData,
            text: chordsLine.get(chordIndex).text.slice(charsFromTheEnd)
        };
        newChordsLine = newChordsLine.insert(chordIndex + 1, new Chord(chordData));
    }
    return slide.setIn(['chords', line], newChordsLine);
}
