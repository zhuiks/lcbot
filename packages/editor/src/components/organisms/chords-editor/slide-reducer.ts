import { useReducer, useRef } from "react";
import { EditorState } from "draft-js";
import { ChordActionType } from "@bit/zhuiks.lcbot.core.types";
import { chordAction, ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import { initChords, applyChord } from "./slide-actions";

export interface ChordsEditorState {
    slide: ChordSlide;
    caretLine: number;
    caretChordIndex: number;
    caretChordOffset: number;
    lastClickX: number;
    caretRef: any;
    toolbarShown: boolean;
    onSave?: (slide: ChordSlide) => void;
}

interface InitArgs {
    initialSlide: ChordSlide;
    caretRef: any;
    onSave?: (slide: ChordSlide) => void;
}

const initState = ({ initialSlide, caretRef, onSave }: InitArgs) => {
    return {
        slide: initialSlide,
        caretLine: 0,
        caretChordIndex: 0,
        caretChordOffset: 3,
        lastClickX: 0,
        caretRef,
        toolbarShown: false,
        onSave,
    }
}
const textMeasureEl = document.createElement('div');
textMeasureEl.innerHTML = 'some test text';


export type SlideActionType = 'CHORD_ACTION' | 'POSITION_CHANGE' | 'ADJUST_POSITION' |'MOVE_CURSOR' | 'FOCUS_LOST' | 'SLIDE_UPDATE';
export interface SlideAction {
    type: SlideActionType;
    editorState?: EditorState;
    payload?: any;
}
const slideReducer = (state: ChordsEditorState, action: SlideAction): ChordsEditorState => {
    console.log(`ChordsEditor: dispatched ${action.type}; state: caret[${state.caretLine}, ${state.caretChordOffset}] toolbar=${state.toolbarShown}`);
    switch (action.type) {
        case 'MOVE_CURSOR':
            return {
                ...state,
                caretLine: state.caretLine + action.payload.y,
                caretChordOffset: state.caretChordOffset + action.payload.x,
            }
        // case 'RESET':
        //     return action.payload ? initState({ slide: action.payload }) : state;
        case 'POSITION_CHANGE':
            const { line, chordIndex, event } = action.payload;
            // console.log(`new caret click: [${line}, ${lastClickX}]`)
            console.log(`adjust caret pos: ${event.target.getBoundingClientRect().width} -> ${100}`)
            // if (line === undefined || (line === state.caretLine && pos === state.caretChordOffset)) return state;
            return {
                ...state,
                caretChordOffset: 3,
                // lastClickX,
                caretLine: line,
                caretChordIndex: chordIndex,
                toolbarShown: true,
            }
        case 'ADJUST_POSITION':
            console.log(`adjust caret pos: ${state.caretRef.current ? state.caretRef.current.getBoundingClientRect().width : 0} -> ${state.lastClickX}`)
            return {
                ...state,
                caretChordOffset: action.payload,
            }    
        case 'FOCUS_LOST':
            return {
                ...state,
                toolbarShown: false,
            }
        case 'SLIDE_UPDATE':
            if (state.onSave && typeof state.onSave === 'function') {
                state.onSave(state.slide);
            }
            return state;
        case 'CHORD_ACTION':
            const newChordSlide = chordAction(
                state.slide,
                action.payload,
                state.caretLine,
                state.caretChordOffset,
            );
            if (newChordSlide === state.slide) return state;
            // state.editorEl.current.focus();
            return {
                ...state,
                slide: newChordSlide,
            };
    }
}

const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void) => {
    const caretRef = useRef(null);
    return useReducer(slideReducer, { initialSlide, caretRef, onSave }, initState);
}

export default useSlide;
