import { EditorState } from "draft-js";
import ChordSlide from "../../chords/chord-slide";
import chordAction from "../../chords/chord-action";
import { initChords, applyChord } from "./slide-actions";
import { ChordActions } from "../../types";

interface ChordsEditorState {
    slide: ChordSlide;
    line: number;
    pos: number;
    editorState: EditorState;
}

let onSaveSlide = (slide: ChordSlide) => {};

export const initState = (slide: ChordSlide, onSave?: any) => {
    if(typeof onSave === 'function') {
        onSaveSlide = onSave;
    }
    const contentState = initChords(slide);
    return {
        slide,
        line: 0,
        pos: 0,
        editorState: EditorState.createWithContent(contentState),
    }
}


interface SlideActionType {
    type: ChordActions | 'RESET' | 'SELECTION_CHANGE' | 'SLIDE_UPDATE';
    editorState: EditorState;
    payload?: any;
}
const slideReducer = (state: ChordsEditorState, action: SlideActionType): ChordsEditorState => {
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
                pos: sel.getAnchorOffset(),
                line: currentLine,
                editorState,
            }
        case 'SLIDE_UPDATE':
            onSaveSlide(state.slide);
            return state;
        default:
            const newChordSlide = chordAction(
                state.slide,
                action.type,
                state.line,
                state.pos,
            );
            const content = applyChord(
                newChordSlide.chords[state.line],
                state.editorState.getCurrentContent(),
                state.line
            );
            return {
                ...state,
                slide: newChordSlide,
                editorState: EditorState.set(state.editorState, {
                    currentContent: content,
                }),
            };
    }
}

export default slideReducer;
