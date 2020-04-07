import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';
import SongSlide from '@bit/zhuiks.lcbot.org.song-slide';
import ChordsEditor from '@bit/zhuiks.lcbot.org.chords-editor';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: "2em",
            borderTop: "2px dotted " + theme.palette.background.default,
            borderBottom: "2px dotted " + theme.palette.background.default,
            padding: theme.spacing(3, 2)
        }
    }));

interface SlideProps {
    slide: ChordSlide;
}

const Slide: React.FC<SlideProps> = ({ slide }) => {
    const classes = useStyles();
    const [elevation, setElevation] = useState(2);
    const [isEdit, setEdit] = useState(false);
    return (
        <Paper
            square
            className={classes.root}
            elevation={elevation}
            onMouseOver={() => setElevation(8)}
            onMouseOut={() => setElevation(2)}
            onClick={() => setEdit(true)}
            onBlur={() => setEdit(false)}
        >
            {isEdit ?
                <ChordsEditor slide={slide} />
                :
                <SongSlide slide={slide} />
            }
        </Paper>
    )
}

export default Slide;