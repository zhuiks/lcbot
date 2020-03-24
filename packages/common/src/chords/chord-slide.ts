import { Record, List, fromJS } from "immutable";
import { SlideType } from "../types";
import Chord, { IChord, REST_CHAR } from "./chord";

// https://www.w3.org/TR/2018/WD-alreq-20180222/#dfn-zwj
const ZWJ = '\u200D';
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
        if (chord.text.startsWith(ZWJ)) {
            pos += 2;
            console.log('starts with ZWJ');
        }
        return charsLength > pos;
    });
    const charsFromTheEnd = pos - charsLength;
    return {
        chordIndex,
        charsFromTheEnd,
    }
}

const _addChord = (type: string, chord: IChord) => {
    return {
        root: type.toUpperCase()
    };

}

const _modChord = (type: string, chord: IChord) => {
    let chordData = {};
    if (chord.root === REST_CHAR) {
        return false;
    }
    switch (type) {
        case 'MIN':
            chordData = {
                quality: 'm',
            }
            break;
        case 'DIM':
            chordData = {
                quality: 'dim',
            }
            break;
        case 'AUG':
            chordData = {
                quality: 'aug',
            }
            break;
        case 'SHARP':
            if (chord.root === 'E' || chord.root === 'B') {
                return false;
            }
            chordData = {
                root: chord.root + '#',
            }
            break;
        default:
            return false;
    }
    return chordData;
}

const _optChord = (type: string, chord: IChord) => {
    if (chord.root === REST_CHAR) {
        return false;
    }
    let chordType = '';
    switch (type) {
        case 'SUS':
            chordType = 'sus';
            break;
        case '7':
            chordType = '7';
            break;
        case '2':
            chordType = '2';
            break;
    }
    return {
        type: chordType,
    }

}

export const modChord = (slide: ChordSlide, type: string, line: number, pos: number) => {
    if (!slide.lines.has(line) || !slide.chords.has(line)) {
        return slide;
    }
    let chordData: Partial<IChord> | boolean = false;
    const modType = type.slice(0, 'ADD_CHORD'.length); //first part
    const chordType = type.slice('ADD_CHORD_'.length);  //second part
    const chordsLine = slide.getIn(['chords', line]);
    const { chordIndex, charsFromTheEnd } = _getChordIndex(slide, line, pos);
    const chord = chordsLine.get(chordIndex);

    switch (modType) {
        case 'ADD_CHORD':
            chordData = _addChord(chordType, chord);
            break;
        case 'MOD_CHORD':
            chordData = _modChord(chordType, chord);
            break;
        case 'OPT_CHORD':
            chordData = _optChord(chordType, chord);
            break;
        case 'DEL_CHORD':
            if (chord.type) {
                chordData = { type: '' };
            } else if (chord.quality) {
                chordData = { quality: '' };
            } else if (chordIndex === 0) {
                chordData = { root: REST_CHAR };
            } else {
                const prevChord = chordsLine.get(chordIndex-1);
                chordData = {
                    text: prevChord.text.replace(new RegExp(`${ZWJ}$`), '') 
                        + chord.text.replace(new RegExp(`^${ZWJ}`), '')
                }
            }
            break;    
    }
    if(!chordData) {
        return slide;
    }

    let newChordsLine;
    const prevChordText = chord.text.slice(0, charsFromTheEnd);

    if ( modType === 'DEL_CHORD' && chordData.text ) {
        newChordsLine = chordsLine.mergeIn([chordIndex-1], chordData)
            .delete(chordIndex);
    } else if (modType === 'ADD_CHORD' && prevChordText.length !== 0) {
        const arabicPairRegex = /^[\u0620-\u064A]{2}$/;
        const addZWJ = arabicPairRegex.test(chord.text.slice(charsFromTheEnd - 1, charsFromTheEnd + 1)) ? ZWJ : '';
        const prevChordData = {
            text: prevChordText + addZWJ,
        }
        chordData = {
            ...chordData,
            text: addZWJ + chord.text.slice(charsFromTheEnd),
        };
        newChordsLine = chordsLine.mergeIn([chordIndex], prevChordData)
            .insert(chordIndex + 1, new Chord(chordData));

    } else {
        newChordsLine = chordsLine.mergeIn([chordIndex], chordData);
    }

    return slide.setIn(['chords', line], newChordsLine);
}
