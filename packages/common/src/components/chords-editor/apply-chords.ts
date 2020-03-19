import { ContentState, Modifier, SelectionState } from "draft-js";

import { IChord } from "../../chords/chord";
import ChordSlide from "../../chords/chord-slide";

function getCharacterLength(str: string) {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
}

const CHORD_TYPE = 'CHORD';
const CHORD_MUTABILITY = 'IMMUTABLE';

export const applyChord = (
    chordData: IChord,
    state: ContentState,
    line: number,
    pos: number
) => {
    // const blockMap = state.getBlockMap();
    // const entityMap = state.getEntityMap();

    const theBlock = state.getBlockMap().toIndexedSeq().get(line);
    const selection = new SelectionState({
        'anchorKey': theBlock.getKey(),
        'anchorOffset': pos,
        'focusKey': theBlock.getKey(),
        'focusOffset': pos + getCharacterLength(chordData.text),
        'isBackward': false,
        'hasFocus': true,
    });

    const newState = state.createEntity(CHORD_TYPE, CHORD_MUTABILITY, {chord: chordData});
    const entityKey = newState.getLastCreatedEntityKey();

    return Modifier.applyEntity(newState, selection, entityKey);
}

export const initChords = (
    slide: ChordSlide,
    initState: ContentState | null = null
) => {
    let state = initState || ContentState.createFromText(slide.lines?.join('\n') || '');
    for (let l=0; l<slide.chords.size; l++ ) {
        let offset = 0;
        for (let k=0; k<slide.chords.get(l).size; k++ ) {
            const chord = slide.chords.getIn([l,k]);
            state = applyChord(chord, state, l, offset);
            offset += getCharacterLength(chord.text);
        }
    }
    return state;
}