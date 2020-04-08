import React, { useReducer } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';
import SongSlide from '@bit/zhuiks.lcbot.org.song-slide';
import ChordsEditor from '@bit/zhuiks.lcbot.org.chords-editor';
import Editable from '../atoms/editable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: "2em",
            borderTop: "2px dotted " + theme.palette.background.default,
            borderBottom: "2px dotted " + theme.palette.background.default,
            padding: theme.spacing(3, 2),
        },
        chordEditing: {
            padding: theme.spacing(2),
            border: "2px solid " + theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
        }
    }));

interface SlideProps {
    slide: ChordSlide;
    onSave?: (s: ChordSlide) => void;
}

interface SlideState {
    isEdit: boolean;
    elevation: number;
    slide: ChordSlide;
    slideName: string;
}
interface SlideAction {
    type: 'MOUSE_OVER' | 'MOUSE_OUT' | 'CLICK' | 'NAME_CHANGE' | 'SAVE';
    payload?: any;
}
const reducer = (state: SlideState, action: SlideAction): SlideState => {
    switch (action.type) {
        case 'MOUSE_OVER':
            return state.isEdit ? state : {
                ...state,
                elevation: 8,
            }
        case 'MOUSE_OUT':
            return state.isEdit ? state : {
                ...state,
                elevation: 2,
            }
        case 'CLICK':
            return state.isEdit ? state : {
                ...state,
                isEdit: true,
                elevation: 12,
            }
        case 'NAME_CHANGE':
            return {
                ...state,
                slideName: action.payload,
            }
        case 'SAVE':
            return {
                ...state,
                isEdit: false,
                elevation: 2,
                slide: new ChordSlide({
                    type: state.slide.type,
                    name: state.slideName,
                    lines: action.payload.lines,
                    chords: action.payload.chords,
                })
            }
        default:
            throw new Error(`Action "${action.type}" not found in slide reducer`);
    }
}

const Slide: React.FC<SlideProps> = ({ slide }) => {
    const classes = useStyles();
    const initialState: SlideState = {
        isEdit: false,
        elevation: 2,
        slide,
        slideName: slide.name,
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Paper
            square
            className={classes.root}
            elevation={state.elevation}
            onMouseOver={() => dispatch({ type: 'MOUSE_OVER' })}
            onMouseOut={() => dispatch({ type: 'MOUSE_OUT' })}
            onClick={() => dispatch({ type: 'CLICK' })}
        // onBlur={() => setEdit(false)}
        >
            {state.isEdit ? (
                <>
                    <Editable
                        variant="h6"
                        helperText="Slide Type"
                        onChange={name => dispatch({ type: 'NAME_CHANGE', payload: name })}
                    >
                        {state.slideName}
                    </Editable>
                    <div className={classes.chordEditing}>
                        <ChordsEditor
                            slide={state.slide}
                            onSave={s => dispatch({ type: 'SAVE', payload: s })}
                        />
                    </div>
                </>
            )
                :
                <SongSlide slide={state.slide} />
            }
        </Paper>
    )
}

export default Slide;