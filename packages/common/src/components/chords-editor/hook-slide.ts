import { useReducer } from "react";
import { EditorState, SelectionState, Modifier, ContentState } from "draft-js";
import ChordSlide from "../../chords/chord-slide";

const CHORD_TYPE = 'CHORD';
const CHORD_MUTABILITY = 'IMMUTABLE';

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
    type: 'RESET' | 'ADD_CHORD' | 'SELECTION_CHANGE';
    editorState: EditorState;
    payload?: any;
}
const slideReducer = (state: SlideEditorState, action: SlideActionType): SlideEditorState => {
    switch (action.type) {
        case 'RESET':
            return action.payload ? initState(action.payload) : state;
        case 'ADD_CHORD':
            const newChordSlide = state.chordSlide.addChord({
                line: state.currentLine,
                pos: state.currentPosition,
                chordData: action.payload,
            });
            const content = applyChord(
                newChordSlide.getChord(state.currentLine, state.currentPosition), 
                state.editorState.getCurrentContent(),
                state.currentLine,
                state.currentPosition);
            return {
                ...state,
                chordSlide: newChordSlide,
                editorState: EditorState.set(state.editorState, {
                    currentContent: content,
                }),
            };
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
            throw new Error();
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

const initChords = (
    slide: ChordSlide,
    initState: ContentState | null = null
) => {
    let state = initState || ContentState.createFromText(slide.lines?.join('\n') || '');
    for (let l=0; l<slide.chords.size; l++ ) {
        let offset = 0;
        for (let k=0; k<slide.chords.get(l).size; k++ ) {
            const chord = slide.getChord(l, k);
            state = applyChord(chord, state, l, offset);
            offset += getCharacterLength(chord.text);
        }
    }
    return state;
}