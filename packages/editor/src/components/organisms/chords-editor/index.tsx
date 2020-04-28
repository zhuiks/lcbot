import React, { KeyboardEvent, useState, useMemo } from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import ChordsBlock from "./chords-block";
import CaretSpan from "./caret-span";
import useSlide, { ChordsEditorState, SlideAction, DispatchContext, StateContext } from "./slide-reducer";
import { SlideActionType } from './slide-reducer';
import { keyBinding } from "./key-binding";
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import ChordsToolbar from "./chords-toolbar";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { initChords, applyChord } from "./slide-actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      border: "2px solid " + theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
    },
    container: {
      position: "relative",
    },
    button: {
      marginTop: theme.spacing(2),
    },
  }));

export interface ChordEditorProps {
  slide: ChordSlide;
  onSave?: (s: ChordSlide) => void;
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide: initialSlide, onSave }) => {
  console.log('rerendering Chord Editor');
  const classes = useStyles();
  const [state, dispatch] = useSlide(initialSlide, onSave);
  // const contentState = initChords(state.slide);
  // const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
  const pixelOffset = state.caretRef.current ? state.caretRef.current.getBoundingClientRect().width : 0;
  // if ( pixelOffset < state.lastClickX ) {
  //   dispatch({type: 'ADJUST_POSITION', payload: state.caretChordOffset+1})
  // }

  const onEditorChange = (newState: EditorState) => {
    // setEditorState(newState);
    const caretPosition = getCaretPosition(newState);
    dispatch({ type: 'POSITION_CHANGE', payload: caretPosition })
  }
  const onClick = (line: number, chordIndex: number, e: React.MouseEvent) => {
    const lastClickX = e.clientX;
    // const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, pos);
    dispatch({ type: 'POSITION_CHANGE', payload: { line, chordIndex, event: e, } })
  }

  return (
    <>
      <div className={classes.root}>
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>

            <div
              className={classes.container}
              onKeyDown={e => keyBinding(e, dispatch)}
            >
              {state.slide.chords.map((chordsLine, i) => (
                <ChordsBlock key={i} chords={chordsLine}
                  onChordClick={(ci, e) => onClick(i, ci, e)}
                />
              ))}
              <CaretSpan />
              <ChordsToolbar />
            </div>
          </StateContext.Provider>
        </DispatchContext.Provider>
      </div>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => dispatch({ type: 'SLIDE_UPDATE' })}
      >
        Update
                </Button>
    </>
  )
}

const getCaretPosition = (editorState: EditorState) => {
  const sel = editorState.getSelection();
  const blockMapKeys = editorState.getCurrentContent().getBlockMap().keySeq();
  const currentBlockKey = sel.getAnchorKey();
  const line = blockMapKeys.findIndex((k?: string) => k === currentBlockKey);
  const pos = sel.getAnchorOffset();
  console.log(`[${line}, ${pos}]`);
  return { line, pos };
}

export default ChordEditor;