import { ContentState, Modifier, SelectionState } from "draft-js";

import { Chord } from "../atoms/chord-span";
import ChordSlide from "../molecules/chord-slide";

function getCharacterLength(str: string, start: number, length: number) {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
}

const CHORD_TYPE = 'CHORD';
const CHORD_MUTABILITY = 'IMMUTABLE';

export const applyChord = (
    chordData: Chord,
    state: ContentState,
    line: number,
    pos: number
) => {
    const blockMap = state.getBlockMap();
    const entityMap = state.getEntityMap();

    const theBlock = state.getBlockMap().toIndexedSeq().get(line);
    const selection = new SelectionState({
        'anchorKey': theBlock.getKey(),
        'anchorOffset': pos,
        'focusKey': theBlock.getKey(),
        'focusOffset': pos + chordData.duration,
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
    for (let l = 0; l < slide.chords.length; l++) {
        let offset = 0;
        for (let i = 0; i < slide.chords[l].length; i++) {
            state = applyChord(slide.chords[l][i], state, l, offset);
            offset += slide.chords[l][i].duration;
        }
    }
    return state;
}