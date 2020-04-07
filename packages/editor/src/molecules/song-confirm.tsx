import React from 'react';
import SongSlide from '@bit/zhuiks.lcbot.org.song-slide';
import TextField from '@material-ui/core/TextField';
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords';

interface SongConfirmProps {
    slides: ChordSlide[];
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