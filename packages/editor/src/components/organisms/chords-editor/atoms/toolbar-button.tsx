import React from 'react'
import { ChordActionType } from '@bit/zhuiks.lcbot.core.types';
import { Button, ButtonProps } from '@material-ui/core';
import { DispatchContext } from '../slide-reducer';

interface ToolbarButtonProps extends ButtonProps{
  payload: ChordActionType | string
}
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ payload, ...rest }) => {
  const dispatch = React.useContext(DispatchContext);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch({ type: 'CHORD_ACTION', payload });
  }
  return (
    <Button
      size="small"
      color="secondary"
      variant="contained"
      onClick={handleClick}
      {...rest}
    />
  )
}

export default ToolbarButton