import React from 'react';
import { TextField } from '@material-ui/core';

interface SongLyricsProps {
    value?: string | string[];
    onChange: (value: string) => void
}

const SongLyrics: React.FC<SongLyricsProps> = ({value='', onChange}) => (
    <TextField 
        multiline
        rows={10}
        value={typeof value === 'string' ? value : (value ? value.join('\n') : '')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        variant='outlined'
        autoFocus
        fullWidth
    />
);

export default SongLyrics;