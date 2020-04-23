import { useReducer, useRef } from "react";
import { EditorState } from "draft-js";
import { ChordActionType } from "@bit/zhuiks.lcbot.core.types";
import { chordAction, ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import { initChords, applyChord } from "./slide-actions";

export interface ChordsEditorState {
    slide: ChordSlide;
    line: number;
    pos: number;
    editorEl: any;
    toolbarShown: boolean;
}

let onSaveSlide = (slide: ChordSlide) => { };
interface InitArgs {
    slide: ChordSlide;
    editorEl: any;
    onSave?: (slide: ChordSlide) => void;
}

const initState = ({ slide, editorEl, onSave }: InitArgs) => {
    if (typeof onSave === 'function') {
        onSaveSlide = onSave;
    }
    return {
        slide,
        line: 2,
        pos: 10,
        editorEl,
        toolbarShown: false,
    }
}


export type SlideActionType = ChordActionType | 'POSITION_CHANGE' | 'FOCUS_LOST' | 'SLIDE_UPDATE';
export interface SlideAction {
    type: SlideActionType;
    editorState?: EditorState;
    payload?: any;
}
const slideReducer = (state: ChordsEditorState, action: SlideAction): ChordsEditorState => {
    console.log(`ChordsEditor: dispatched ${action.type}; state: caret[${state.line}, ${state.pos}] toolbar=${state.toolbarShown}`);
    switch (action.type) {
        // case 'RESET':
        //     return action.payload ? initState({ slide: action.payload }) : state;
        case 'POSITION_CHANGE':
            const { line, pos } = action.payload;
            if (line !== undefined || pos !== undefined || (line === state.line && pos === state.pos)) return state;
            return {
                ...state,
                pos,
                line,
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
            if (newChordSlide === state.slide) return state;
            state.editorEl.current.focus();
            return {
                ...state,
                slide: newChordSlide,
            };
    }
}

const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void) => {
    const editorEl = useRef(null);
    return useReducer(slideReducer, { slide: initialSlide, editorEl, onSave }, initState);
}

export default useSlide;
