import React from 'react';
import { SlideInput } from '../__generated__/globalTypes';
import SongSlide from '@bit/zhuiks.lcbot.song-slide';
import TextField from '@material-ui/core/TextField';

interface SongConfirmProps {
    slides: SlideInput[];
    songTitle: string;
    onTitleChange: (value: string) => void;
}

const SongConfirm: React.FC<SongConfirmProps> = ({ slides, songTitle, onTitleChange }) => (
    <>
        <TextField
            helperText="Song title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onTitleChange(e.target.value) }}
            value={songTitle}
        />
        {slides.map((slide, i) => (
            <SongSlide key={i} slide={slide} />
        ))}
    </>
)


export default SongConfirm;