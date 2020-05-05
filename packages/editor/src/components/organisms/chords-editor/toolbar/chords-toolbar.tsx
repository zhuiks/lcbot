import React, { useContext, useState } from 'react'
import { ChordActionType, ChordChar } from '@bit/zhuiks.lcbot.core.types'
import { StateContext } from '../slide-reducer'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Fade, fade } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Chord } from '@bit/zhuiks.lcbot.core.chords'
import ToolbarButton from './toolbar-button'
import ModChord from './mod-chord'

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
      left: 0,
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

interface ChordButtonProps {
  act: ChordActionType;
  char: ChordChar;
  flat?: boolean;
  sharp?: boolean;
}

const ChordButton: React.FC<ChordButtonProps> = ({ char, act, flat, sharp, }) => {
  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      className={classes.btnContainer}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <ToolbarButton payload={act} contained>
        {char}
      </ToolbarButton>
      {flat &&
        <Fade in={mouseOver}>
          <ToolbarButton
            className={classes.btnPitch + ' ' + classes.btnFlat}
            payload={act + '_FLAT'}
            contained
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
            contained
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
  if (!selectedChord) return null;
  console.log(selectedChord)
  return (
    <>
      <ToolbarButton
        payload={ChordActionType.MOD_CHORD_MIN}
        selected={selectedChord.quality === "m"}
      >
        <ModChord text="m" />
      </ToolbarButton>
      <ToolbarButton
        payload={ChordActionType.MOD_CHORD_DIM}
        selected={selectedChord.quality === "dim"}
      >
        <ModChord sub="dim" />
      </ToolbarButton>
      <ToolbarButton
        payload={ChordActionType.MOD_CHORD_AUG}
        selected={selectedChord.quality === "aug"}
      >
        <ModChord sub="aug" />
      </ToolbarButton>
      <ToolbarButton
        payload={ChordActionType.OPT_CHORD_SUS}
        selected={selectedChord.type === "sus"}
      >
        <ModChord sup="sus" />
      </ToolbarButton>
      <ToolbarButton
        payload={ChordActionType.OPT_CHORD_2}
        selected={selectedChord.type === "2"}
      >
        <ModChord sup="2" />
        </ToolbarButton>
      <ToolbarButton
        payload={ChordActionType.OPT_CHORD_7}
        selected={selectedChord.type === "7"}
      >
        <ModChord sup="7" />
        </ToolbarButton>

      <ToolbarButton payload={ChordActionType.DEL_CHORD_DEL} >
        <DeleteIcon />
      </ToolbarButton>

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