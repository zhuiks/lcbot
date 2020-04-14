import { Chord, ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import { ContentState, SelectionState, Modifier } from "draft-js";
import { Map } from "immutable";

const getCharacterLength = (str: string) => {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
}


export const applyChord = (
    chordsLine: Chord[],
    contentState: ContentState,
    line: number,
) => {
    // const blockMap = state.getBlockMap();
    // const entityMap = state.getEntityMap();
    // console.log(`#${line} applyChord:`, chordsLine.toJS());
    const theBlock = contentState.getBlockMap().toIndexedSeq().get(line);
    const selection = new SelectionState({
        'anchorKey': theBlock.getKey(),
        'anchorOffset': 0,
        'focusKey': theBlock.getKey(),
        'focusOffset': 1,
        'isBackward': false,
        'hasFocus': true,
    });

    return Modifier.setBlockData(contentState, selection, Map({ chords: chordsLine }));
}

export const initChords = (
    slide: ChordSlide,
    initState: ContentState | null = null
) => {
    let content = initState || ContentState.createFromText(slide.lines?.join('\n') || '');
    console.log(`initChords:`, initState);
    for (let l = 0; l < slide.chords.length; l++) {
        content = applyChord(slide.chords[l], content, l);
    }
    return content;
}