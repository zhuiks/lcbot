import React from 'react'
import { ButtonGroup, Button } from '@material-ui/core'
import { ChordActionType } from '@bit/zhuiks.lcbot.core.types'
import { SlideAction } from './slide-reducer'

interface ChordsToolbarProps {
  currentLine: number;
  dispatch: (args: SlideAction) => void;
}

const ChordsToolbar: React.FC<ChordsToolbarProps> = ({ currentLine, dispatch }) => {
  return (
    <ButtonGroup size="small" color="secondary" variant="contained">
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_C })}>C</Button>
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_D })}>D</Button>
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_E })}>E</Button>
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_F })}>F</Button>
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_G })}>G</Button>
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_A })}>A</Button>
      <Button onClick={() => dispatch({ type: ChordActionType.ADD_CHORD_B })}>B</Button>
    </ButtonGroup>
  )
}

export default ChordsToolbar