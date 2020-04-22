import { useReducer } from "react";
import { EditorState } from "draft-js";
import { ChordActionType } from "@bit/zhuiks.lcbot.core.types";
import { chordAction, ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import { initChords, applyChord } from "./slide-actions";

interface ChordsEditorState {
    slide: ChordSlide;
    line: number;
    pos: number;
    editorState: EditorState;
    toolbarShown: boolean;
}

let onSaveSlide = (slide: ChordSlide) => { };

export const initState = (slide: ChordSlide, onSave?: any) => {
    if (typeof onSave === 'function') {
        onSaveSlide = onSave;
    }
    const contentState = initChords(slide);
    return {
        slide,
        line: 0,
        pos: 0,
        editorState: EditorState.createWithContent(contentState),
        toolbarShown: false,
    }
}

export type SlideActionType = ChordActionType | 'RESET' | 'SELECTION_CHANGE' | 'FOCUS_LOST' | 'SLIDE_UPDATE';
export interface SlideAction {
    type: SlideActionType;
    editorState?: EditorState;
    payload?: any;
}
const slideReducer = (state: ChordsEditorState, action: SlideAction): ChordsEditorState => {
    console.log(`ChordsEditor: dispatched ${action.type}`);
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
                toolbarShown: true,
            }
        case 'FOCUS_LOST':
            return {
                ...state,
                toolbarShown: false,
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

const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void) => {
    const initialState = initState(initialSlide, onSave);
    return useReducer(slideReducer, initialState);
}

export default useSlide;
