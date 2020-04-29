import { useReducer, useRef, createContext, MouseEvent } from "react";
import { EditorState } from "draft-js";
import { ChordActionType } from "@bit/zhuiks.lcbot.core.types";
import { chordAction, ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import { initChords, applyChord } from "./slide-actions";

export interface ChordsEditorState {
  slide: ChordSlide;
  charPixelOffset: (number[] | null)[][];
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
  const nulledArray = initialSlide.chords.map(line => (
    line.map(() => {
      return null;
    })
  ));
  return {
    slide: initialSlide,
    charPixelOffset: nulledArray,
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


export type SlideActionType = 'CHORD_ACTION' | 'POSITION_CHANGE' | 'ADJUST_POSITION' | 'UPDATE_WIDTH' | 'MOVE_CURSOR' | 'FOCUS_LOST' | 'SLIDE_UPDATE';
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
      const { line, lastClickX } = action.payload;
      const chordIndex = action.payload.chordIndex < 0 ? 
        state.slide.chords[line].length - 1 : 
        action.payload.chordIndex;
      if (line === undefined || !lastClickX || state.charPixelOffset[line][chordIndex] === null)
        return state;
      const offset = state.charPixelOffset[line][chordIndex]
        .findIndex(px => lastClickX < px);
      // if (line === undefined || (line === state.caretLine && pos === state.caretChordOffset)) return state;
      return {
        ...state,
        caretLine: line,
        caretChordIndex: chordIndex < 0 ? state.caretChordIndex : chordIndex,
        caretChordOffset: offset+1,
        toolbarShown: true,
      }
    case 'ADJUST_POSITION':
      return {
        ...state,
        caretChordOffset: state.caretChordOffset + action.payload,
        madeAdjustments: state.madeAdjustments + 1,
      }
    case 'UPDATE_WIDTH':
      if (state.madeAdjustments > 10) return state
      console.log(`updating [${action.payload.line}, ${action.payload.chordIndex}]: ${action.payload.charPixels}`)
      return {
        ...state,
        charPixelOffset: [
          ...state.charPixelOffset.slice(0, action.payload.line),
          [
            ...state.charPixelOffset[action.payload.line].slice(0, action.payload.chordIndex),
            action.payload.charPixels,
            ...state.charPixelOffset[action.payload.line].slice(action.payload.chordIndex),
          ],
          ...state.charPixelOffset.slice(action.payload.line + 1),
        ]
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

type EmptyFunction = (args: any) => void;
export const DispatchContext = createContext<React.Dispatch<SlideAction> | EmptyFunction>(() => { });
export const StateContext = createContext<ChordsEditorState | null>(null);

const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void) => {
  const caretRef = useRef(null);
  return useReducer(slideReducer, { initialSlide, caretRef, onSave }, initState);
}

export default useSlide;
