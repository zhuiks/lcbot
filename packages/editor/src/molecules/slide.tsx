import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import SongSlide from '@bit/zhuiks.lcbot.song-slide';
import { SlideInput } from '../__generated__/globalTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
    slide: SlideInput;
}

const Slide: React.FC<SlideProps> = ({ slide }) => {
    const classes = useStyles();
    const [elevation, setElevation] = useState(2)
    return (
        <Paper
            square
            className={classes.root}
            elevation={elevation}
            onMouseOver={() => setElevation(8)}
            onMouseOut={() => setElevation(2)}
        >
            <SongSlide slide={slide} />
        </Paper>
    )
}

export default Slide;