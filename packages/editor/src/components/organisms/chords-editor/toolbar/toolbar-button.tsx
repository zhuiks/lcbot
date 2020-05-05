import React from 'react'
import { ChordActionType } from '@bit/zhuiks.lcbot.core.types';
import { Button, ButtonProps, fade } from '@material-ui/core';
import { DispatchContext } from '../slide-reducer';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    btn: {
      boxShadow: 'none',
      minWidth: 30,
      paddingLeft: 5,
      paddingRight: 5,
    },
    grouped: {
      '&:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: `1px solid ${fade(theme.palette.grey[800], 0.5)}`,
      }
    },
    selected: {
      background: theme.palette.secondary.dark
    },
  }))
interface ToolbarButtonProps extends ButtonProps {
  payload: ChordActionType | string
  selected?: boolean
  contained?: boolean
}
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ payload, selected, contained, className, ...rest }) => {
  const dispatch = React.useContext(DispatchContext);
  const classes = useStyles();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch({ type: 'CHORD_ACTION', payload });
  }
  return (
    <Button
      className={classes.btn + (contained ? '' : ' ' + classes.grouped) + (selected ? ' '+classes.selected : '') + ' ' + className}
      size="small"
      color="secondary"
      variant="contained"
      onClick={handleClick}
      {...rest}
    />
  )
}

export default ToolbarButton