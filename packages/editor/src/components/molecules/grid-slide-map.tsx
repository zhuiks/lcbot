import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';
import SongSlide from '@bit/zhuiks.lcbot.org.song-slide';
import ChordsEditor from '../organisms/chords-editor';
import Editable from '../atoms/editable';
import { FormAction } from '../../hooks/use-form-reducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: "2em",
            borderTop: "2px dotted " + theme.palette.background.default,
            borderBottom: "2px dotted " + theme.palette.background.default,
            padding: theme.spacing(3, 2),
        },
        active: {
            zIndex: 10,
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
            fontSize: '1.2em',
        },
        chordEditing: {
            padding: theme.spacing(2),
            border: "2px solid " + theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
        }
    }));

const slideElevation = (isMouseOver: boolean, isEdit: boolean) => (
    isEdit ? 12 : (isMouseOver ? 8 : 2)
);

interface GridSlideProps {
    slides: ChordSlide[];
    editSlide: number;
    editSlideName: string;
    dispatch: (action: FormAction) => void;
}

const GridSlideMap: React.FC<GridSlideProps> = ({ slides, editSlide, editSlideName, dispatch }) => {
    const classes = useStyles();
    const [mouseOver, setMouseOver] = useState(-1);
    return (
        <>
            {slides.map((slide: ChordSlide, i: number) => (
                <Grid item key={i} className={i === editSlide ? ' '+classes.active : ''}>
                    <Paper
                        square
                        className={classes.root}
                        elevation={slideElevation(i === mouseOver, i === editSlide)}
                        onMouseOver={() => setMouseOver(i)}
                        onMouseOut={() => setMouseOver(-1)}
                        onClick={() => dispatch({ type: 'CHORDS_EDIT', payload: i })}
                    // onBlur={() => setEdit(false)}
                    >
                        {i === editSlide ? (
                            <>
                                <Editable
                                    variant="h6"
                                    helperText="Slide Type"
                                    onChange={name => dispatch({ type: 'NAME_CHANGE', payload: name })}
                                >
                                    {editSlideName}
                                </Editable>
                                <div className={classes.chordEditing}>
                                    <ChordsEditor
                                        slide={slide}
                                        onSave={s => dispatch({ type: 'CHORDS_UPDATE', payload: s })}
                                    />
                                </div>
                                <Typography>Press 'Enter' to update the slide</Typography>
                            </>
                        )
                            :
                            <SongSlide slide={slide} displayChords />
                        }
                    </Paper>
                </Grid>
            ))
            }
        </>
    )
}

export default GridSlideMap;