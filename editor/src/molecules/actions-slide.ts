import { useReducer } from "react"
import { EditorState } from "draft-js";
import ChordSlide from "./chord-slide";
import { initChords, applyChord } from "../lib/apply-chords";

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
                action.payload, 
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
            if (!action.payload) return state;
            const es = action.payload;
            const sel = es.getSelection();
            const blockMapKeys = es.getCurrentContent().getBlockMap().keySeq();
            const currentBlockKey = sel.getAnchorKey();
            console.log(`[${blockMapKeys.findIndex(k => k === currentBlockKey)}, ${sel.getAnchorOffset()}]`);
            return {
                ...state,
                currentPosition: sel.getAnchorOffset(),
                currentLine: blockMapKeys.findIndex(k => k === currentBlockKey),
                editorState: es,
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