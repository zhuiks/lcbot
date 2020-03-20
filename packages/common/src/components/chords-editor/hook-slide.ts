import { useReducer } from "react";
import { EditorState } from "draft-js";
import ChordSlide from "../../chords/chord-slide";
import { initChords, applyChord } from "./apply-chords";

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