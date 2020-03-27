import React from 'react';
import { TextField } from '@material-ui/core';

interface SongLyricsProps {
    value?: string | string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SongLyrics: React.FC<SongLyricsProps> = ({value='', onChange}) => (
    <TextField 
        multiline
        rows={10}
        value={typeof value === 'string' ? value : (value ? value.join('\n') : '')}
        onChange={onChange}
        variant='outlined'
        autoFocus
        fullWidth
    />
);

export default SongLyrics;