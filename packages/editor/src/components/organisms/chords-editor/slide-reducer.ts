import { useReducer, useRef, createContext, MouseEvent } from "react";
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
    madeAdjustments: number;
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
        caretChordOffset: 0,
        lastClickX: 0,
        caretRef,
        toolbarShown: false,
        onSave,
        madeAdjustments: 0,
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
            if (line === undefined || !event.target) return state;
            // if (line === undefined || (line === state.caretLine && pos === state.caretChordOffset)) return state;
            return {
                ...state,
                lastClickX: getClickX(event),
                caretLine: line,
                caretChordIndex: chordIndex < 0 ? state.caretChordIndex: chordIndex,
                toolbarShown: true,
                madeAdjustments: 0,
            }
        case 'ADJUST_POSITION':
            return {
                ...state,
                caretChordOffset: state.caretChordOffset + action.payload,
                madeAdjustments: state.madeAdjustments+1,
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
const getClickX = (e: MouseEvent) => e.clientX-(e.target as Element).getBoundingClientRect().x;

type EmptyFunction = (args: any)=>void;
export const DispatchContext = createContext<React.Dispatch<SlideAction>|EmptyFunction>(() => {});
export const StateContext = createContext<ChordsEditorState | null>(null);

const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void) => {
    const caretRef = useRef(null);
    return useReducer(slideReducer, { initialSlide, caretRef, onSave }, initState);
}

export default useSlide;
