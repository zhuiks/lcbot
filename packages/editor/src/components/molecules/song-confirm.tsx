import React from 'react';
import SongSlide from '@bit/zhuiks.lcbot.org.song-slide';
import { TextField, InputAdornment } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            textAlign: "left",
            flip: false,
        },
    }));

interface SongConfirmProps {
    slides: ChordSlide[];
    songTitle: string;
    onTitleChange: (value: string) => void;
    link?: {
        value: string;
        onChange: (value: string) => void;
        isInvalid: boolean;
        validate: () => void;
    }
}

const SongConfirm: React.FC<SongConfirmProps> = ({ slides, songTitle, onTitleChange, link }) => {
    const classes = useStyles();
    return (
        <>
            <TextField
                helperText="Song Title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onTitleChange(e.target.value) }}
                value={songTitle}
            />
            {slides.map((slide, i) => (
                <SongSlide key={i} slide={slide} />
            ))}
            {link &&
                <TextField
                    helperText={link && link.isInvalid ? "Enter correct youtube link" : "Youtube Link"}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <YouTubeIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { link.onChange(e.target.value) }}
                    value={link.value}
                    error={link.isInvalid}
                    onBlur={link.validate}
                />
            }
        </>
    )
}


export default SongConfirm;