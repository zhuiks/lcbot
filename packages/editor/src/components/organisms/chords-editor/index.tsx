import React, { useState, useMemo } from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import ChordsBlock from "./chords-block";
import CaretSpan from "./caret-span";
import useSlide from "./slide-reducer";
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

  const onEditorChange = (newState: EditorState) => {
    // setEditorState(newState);
    const caretPosition = getCaretPosition(newState);
    dispatch({ type: 'POSITION_CHANGE', payload: caretPosition })
  }

  const onKeyCommand = (command: SlideActionType, es: EditorState) => {

    console.log(command);
    if (/^[A-Z]{3}_CHORD_\S+$/.test(command) || command === 'SLIDE_UPDATE') {
      dispatch({ type: command, editorState: es });
      const content = applyChord(
        state.slide.chords[state.line],
        es.getCurrentContent(),
        state.line
      );
      // setEditorState(EditorState.set(es, {
      //   currentContent: content,
      // }));
    }
    const handled: DraftHandleValue = "handled";
    return handled;
  }

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container} >
        {state.slide.chords.map((chordsLine, i) => (
          <ChordsBlock key={i} chords={chordsLine} />
        ))}
        <CaretSpan {...state} />
        {state.toolbarShown &&
          <ChordsToolbar
            currentLine={state.line}
            dispatch={dispatch}
          />
        }
        </div>
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