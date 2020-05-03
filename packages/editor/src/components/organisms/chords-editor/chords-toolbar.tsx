import React, { useContext, useState } from 'react'
import { Button, ButtonProps, fade } from '@material-ui/core'
import { ChordActionType } from '@bit/zhuiks.lcbot.core.types'
import { StateContext, DispatchContext } from './slide-reducer'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      display: 'flex',
      position: 'absolute',
      bottom: '-1.7em',
      right: '-10em',
      zIndex: 12,
      opacity: 0.8,
    },
    btnContainer: {
      position: 'relative',
      '&>.MuiButton-root': {
        boxShadow: 'none',
        minWidth: 30,
      },
      '&:not(:first-child)>.MuiButton-root': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      '&:not(:last-child)>.MuiButton-root': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: `1px solid ${fade(theme.palette.grey[800], 0.5)}`,
      }
    },
    btnPitch: {
      position: 'absolute',
      direction: 'ltr',
      flip: false,
      left: 0,
      paddingLeft: 5,
      paddingRight: 5,
    },
    btnFlat: {
      bottom: -32,
      borderBottomLeftRadius: `${theme.shape.borderRadius}px !important`,
      borderBottomRightRadius: `${theme.shape.borderRadius}px !important`,
      borderTop: `1px solid ${fade(theme.palette.grey[800], 0.5)}`,
    },
    btnSharp: {
      top: -32,
      borderTopLeftRadius: `${theme.shape.borderRadius}px !important`,
      borderTopRightRadius: `${theme.shape.borderRadius}px !important`,
      borderBottom: `1px solid ${fade(theme.palette.grey[800], 0.5)}`,
    },
  }));

type ChordChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
interface ChordButtonProps extends ButtonProps {
  act: ChordActionType;
  char: ChordChar;
  flat?: boolean;
  sharp?: boolean;
}
const ChordButton: React.FC<ChordButtonProps> = ({ char, act, flat, sharp, }) => {
  const dispatch = useContext(DispatchContext);
  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div 
      className={classes.btnContainer} 
      onMouseEnter={()=>setMouseOver(true)}
      onMouseLeave={()=>setMouseOver(false)}
      >
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={() => dispatch({ type: 'CHORD_ACTION', payload: act })}
      >
        {char}
      </Button>
      {flat &&
        <Fade in={mouseOver}>
          <Button
            className={classes.btnPitch + ' ' + classes.btnFlat}
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => dispatch({ type: 'CHORD_ACTION', payload: act })}
          >
            {char}♭
          </Button>
        </Fade>
      }
      {sharp &&
        <Fade in={mouseOver}>
          <Button
            className={classes.btnPitch + ' ' + classes.btnSharp}
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => dispatch({ type: 'CHORD_ACTION', payload: act })}
          >
            {char}♯
          </Button>
        </Fade>
      }
    </div>
  )
};

const ChordsToolbar: React.FC = () => {
  const state = useContext(StateContext);
  const classes = useStyles();
  if (!state || !state.toolbarShown) return null;
  // console.log(`top = ${1+2.5 * (currentLine+1)}em`);
  return (
    <div className={classes.root}>
      <ChordButton act={ChordActionType.ADD_CHORD_C} char="C" sharp />
      <ChordButton act={ChordActionType.ADD_CHORD_D} char="D" flat />
      <ChordButton act={ChordActionType.ADD_CHORD_E} char="E" flat />
      <ChordButton act={ChordActionType.ADD_CHORD_F} char="F" sharp />
      <ChordButton act={ChordActionType.ADD_CHORD_G} char="G" flat sharp />
      <ChordButton act={ChordActionType.ADD_CHORD_A} char="A" flat />
      <ChordButton act={ChordActionType.ADD_CHORD_B} char="B" flat />
    </div>
  )
}

export default ChordsToolbar