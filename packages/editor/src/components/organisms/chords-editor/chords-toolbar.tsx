import React, { useContext, useState } from 'react'
import { Button, ButtonProps, fade } from '@material-ui/core'
import { ChordActionType, ChordChar } from '@bit/zhuiks.lcbot.core.types'
import { StateContext, DispatchContext } from './slide-reducer'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Chord } from '@bit/zhuiks.lcbot.core.chords'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import ToolbarButton from './atoms/toolbar-button'

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

type PitchType = 'SHARP' | 'FLAT' | '';
interface ChordButtonProps extends ButtonProps {
  act: ChordActionType;
  char: ChordChar;
  flat?: boolean;
  sharp?: boolean;
}

const ChordButton: React.FC<ChordButtonProps> = ({ char, act, flat, sharp, }) => {
  // const dispatch = useContext(DispatchContext);
  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false);
  // const handleClick = (e: React.MouseEvent<HTMLElement>, pitch: PitchType = '') => {
  //   e.stopPropagation();
  //   const payload = pitch ? act + '_' + pitch : act;
  //   dispatch({ type: 'CHORD_ACTION', payload });
  // }
  return (
    <div
      className={classes.btnContainer}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <ToolbarButton payload={act}>
        {char}
      </ToolbarButton>
      {flat &&
        <Fade in={mouseOver}>
          <ToolbarButton
            className={classes.btnPitch + ' ' + classes.btnFlat}
            payload={act + '_FLAT'}
          >
            {char}♭
          </ToolbarButton>
        </Fade>
      }
      {sharp &&
        <Fade in={mouseOver}>
          <ToolbarButton
            className={classes.btnPitch + ' ' + classes.btnSharp}
            payload={act + '_SHARP'}
          >
            {char}♯
          </ToolbarButton>
        </Fade>
      }
    </div>
  )
};

const AddChordToolbar: React.FC = () => (
  <>
    <ChordButton act={ChordActionType.ADD_CHORD_C} char="C" sharp />
    <ChordButton act={ChordActionType.ADD_CHORD_D} char="D" flat />
    <ChordButton act={ChordActionType.ADD_CHORD_E} char="E" flat />
    <ChordButton act={ChordActionType.ADD_CHORD_F} char="F" sharp />
    <ChordButton act={ChordActionType.ADD_CHORD_G} char="G" flat sharp />
    <ChordButton act={ChordActionType.ADD_CHORD_A} char="A" flat />
    <ChordButton act={ChordActionType.ADD_CHORD_B} char="B" flat />
  </>
)

interface ChordsToolbarProps {
  selectedChord?: Chord | false;
}
const ModChordToolbar: React.FC<ChordsToolbarProps> = ({ selectedChord }) => {
  const dispatch = useContext(DispatchContext);
  const classes = useStyles();
  if (!selectedChord) return null;
  const handleQuality = (e: React.MouseEvent<HTMLElement>, newQuality: string | null) => {
    e.stopPropagation();
    let payload = '';
    switch (newQuality) {
      case 'm':
        payload = ChordActionType.MOD_CHORD_MIN;
        break;
      case 'aug':
        payload = ChordActionType.MOD_CHORD_AUG;
        break;
      case 'dim':
        payload = ChordActionType.MOD_CHORD_DIM;
        break;
    }
    dispatch({ type: 'CHORD_ACTION', payload });
  }
  return (
    <>
        {/* <Button value="m" aria-label="bold">
          m
        </Button>
        <ToggleButton value="dim" aria-label="italic">
          dim
        </ToggleButton>
        <ToggleButton value="aug" aria-label="underlined">
          aug
        </ToggleButton> */}

      <Button
        size="small"
        color="secondary"
        variant="contained"
      // onClick={}
      >
        <DeleteIcon />
      </Button>

    </>
  )
}
const ChordsToolbar: React.FC<ChordsToolbarProps> = ({ selectedChord }) => {
  const state = useContext(StateContext);
  const classes = useStyles();
  if (!state || !state.toolbarShown) return null;
  // console.log(`top = ${1 + 2.5 * (currentLine + 1)}em`);
  return (
    <div className={classes.root}>
      {selectedChord ?
        <ModChordToolbar selectedChord={selectedChord} />
        :
        <AddChordToolbar />
      }
    </div>
  )
}

export default ChordsToolbar