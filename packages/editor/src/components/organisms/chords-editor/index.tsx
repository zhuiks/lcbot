import React from "react";
import ChordsBlock from "./chords-block";
import useSlide, { DispatchContext, StateContext } from "./slide-reducer";
import { keyBinding } from "./key-binding";
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, useTheme } from "@material-ui/core";

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
  rtl?: boolean; 
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide: initialSlide, onSave, rtl }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isRTL = rtl !== undefined ? rtl : theme.direction.toLowerCase()==='rtl' || false;
  const [state, dispatch] = useSlide(initialSlide, onSave, isRTL);

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
                <ChordsBlock key={i} line={i} chords={chordsLine} />
              ))}
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

export default ChordEditor;