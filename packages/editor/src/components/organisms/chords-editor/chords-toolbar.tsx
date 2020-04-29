import React, { useContext } from 'react'
import { ButtonGroup, Button } from '@material-ui/core'
import { ChordActionType } from '@bit/zhuiks.lcbot.core.types'
import { StateContext, DispatchContext } from './slide-reducer'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      position: "absolute",
      bottom: "-1.7em",
      right: "-10em",
      zIndex: 12,
      opacity: 0.8,
    },
    button: {
    },
  }));


const ChordsToolbar: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const classes = useStyles({ line: state ? state.caretLine : 0 });
  if (!state || !state.toolbarShown) return null;
  // console.log(`top = ${1+2.5 * (currentLine+1)}em`);
  return (
    <ButtonGroup className={classes.root} size="small" color="secondary" variant="contained">
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_C })}>C</Button>
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_D })}>D</Button>
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_E })}>E</Button>
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_F })}>F</Button>
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_G })}>G</Button>
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_A })}>A</Button>
      <Button onClick={() => dispatch({ type: 'CHORD_ACTION', payload: ChordActionType.ADD_CHORD_B })}>B</Button>
    </ButtonGroup>
  )
}

export default ChordsToolbar