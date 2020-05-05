import { useReducer, createContext } from "react";
import { chordAction, ChordSlide } from "@bit/zhuiks.lcbot.core.chords";

export interface ChordsEditorState {
  slide: ChordSlide;
  charPixelOffset: (number[] | null)[][];
  caretLine: number;
  caretChordIndex: number;
  caretChordOffset: number;
  toolbarShown: boolean;
  onSave?: (slide: ChordSlide) => void;
  rtl: boolean;
  madeAdjustments: number;
}

interface InitArgs {
  initialSlide: ChordSlide;
  onSave?: (slide: ChordSlide) => void;
  isRTL?: boolean;
}

const initState = ({ initialSlide, onSave, isRTL }: InitArgs) => {
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
    caretChordOffset: 1,
    toolbarShown: true,
    onSave,
    rtl: isRTL || false,
    madeAdjustments: 0,
  }
}
const textMeasureEl = document.createElement('div');
textMeasureEl.innerHTML = 'some test text';


export type SlideActionType = 'CHORD_ACTION' | 'POSITION_CHANGE' | 'ADJUST_POSITION' | 'UPDATE_WIDTH' | 'MOVE_CURSOR' | 'FOCUS_LOST' | 'SLIDE_UPDATE';
export interface SlideAction {
  type: SlideActionType;
  payload?: any;
}
const slideReducer = (state: ChordsEditorState, action: SlideAction): ChordsEditorState => {
  console.log(`ChordsEditor: dispatched ${action.type}; state: caret[#${state.caretLine}: ${state.caretChordIndex}~${state.caretChordOffset}] toolbar=${state.toolbarShown}`);
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
      if (line === undefined || !lastClickX || !state.charPixelOffset[line][chordIndex])
        return state;
      const charPixels = state.charPixelOffset[line][chordIndex] || [];  
      const offset =  charPixels.findIndex(
        px => lastClickX < px
      );
      // if (line === undefined || (line === state.caretLine && pos === state.caretChordOffset)) return state;
      return {
        ...state,
        caretLine: line,
        caretChordIndex: chordIndex < 0 ? state.caretChordIndex : chordIndex,
        caretChordOffset: offset < 0 ? charPixels.length : offset + 1,
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
        state.caretChordIndex,
        state.caretChordOffset,
      );
      if (newChordSlide === state.slide) return state;
      console.log(newChordSlide.chords[state.caretLine])
      const nulledLine = newChordSlide.chords[state.caretLine].map((c)=> { 
        return null;
      });
      return {
        ...state,
        slide: newChordSlide,
        charPixelOffset: [
          ...state.charPixelOffset.slice(0, state.caretLine),
          nulledLine,
          ...state.charPixelOffset.slice(state.caretLine+1),
        ],
        caretChordIndex: state.caretChordIndex+1,
        caretChordOffset: 1,
      };
  }
}

type EmptyFunction = (args: any) => void;
export const DispatchContext = createContext<React.Dispatch<SlideAction> | EmptyFunction>(() => { });
export const StateContext = createContext<ChordsEditorState | null>(null);

const useSlide = (initialSlide: ChordSlide, onSave?: (s: ChordSlide) => void, isRTL?: boolean) => {
  return useReducer(slideReducer, { initialSlide, onSave, isRTL }, initState);
}

export default useSlide;
