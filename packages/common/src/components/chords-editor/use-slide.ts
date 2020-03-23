import { useReducer } from "react";
import { EditorState, SelectionState, Modifier, ContentState } from "draft-js";
import ChordSlide, { modChord } from "../../chords/chord-slide";
import { IChord } from "../../chords/chord";
import { List, Map } from "immutable";


interface SlideEditorState {
    chordSlide: ChordSlide;
    currentLine: number;
    currentPosition: number;
    editorState: EditorState;
}

const initState = (slide: ChordSlide) => {
    const contentState = initChords(slide);
    return {
        chordSlide: slide,
        currentLine: 0,
        currentPosition: 0,
        editorState: EditorState.createWithContent(contentState),
    }
}

interface SlideActionType {
    type: string;
    editorState: EditorState;
    payload?: any;
}
const slideReducer = (state: SlideEditorState, action: SlideActionType): SlideEditorState => {
    switch (action.type) {
        case 'RESET':
            return action.payload ? initState(action.payload) : state;
        case 'SELECTION_CHANGE':
            if (!action.editorState) return state;
            const editorState = action.editorState;
            const sel = editorState.getSelection();

            const blockMapKeys = editorState.getCurrentContent().getBlockMap().keySeq();
            const currentBlockKey = sel.getAnchorKey();
            const currentLine = blockMapKeys.findIndex((k?: string) => k === currentBlockKey);
            console.log(`[${currentLine}, ${sel.getAnchorOffset()}]`);
            return {
                ...state,
                currentPosition: sel.getAnchorOffset(),
                currentLine,
                editorState,
            }
        default:
            const newChordSlide = modChord(
                state.chordSlide, 
                action.type,
                state.currentLine,
                state.currentPosition,
            );
            const content = applyChord(
                newChordSlide.chords.get(state.currentLine),
                state.editorState.getCurrentContent(),
                state.currentLine);
            return {
                ...state,
                chordSlide: newChordSlide,
                editorState: EditorState.set(state.editorState, {
                    currentContent: content,
                }),
            };
    }
}

export const useSlide = (initialSlide: ChordSlide) => {
    const initialState = initState(initialSlide);
    const [state, dispatch] = useReducer(slideReducer, initialState);
    return {
        editorState: state.editorState,
        dispatch
    }
}

const getCharacterLength = (str: string) => {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
}


const applyChord = (
    chordsLine: List<IChord>,
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
    for (let l = 0; l < slide.chords.size; l++) {
        content = applyChord(slide.chords.get(l), content, l);
    }
    return content;
}