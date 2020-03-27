import React from 'react';
import { action } from '@storybook/addon-actions';

import SongLyrics from './song-lyrics';

export default {
  title: 'Page Atoms/Song Lyrics Input',
  component: SongLyrics,
};

const mockValue = [
  "Усі діла Твої звеличують Тебе",
  "Усе для Тебе і Тобою все живе!",
  "Усі ми створені в Тобі знайти усе",
  "Боже в Тобі усе!",
];


export const Default = () => (
  <SongLyrics 
    value={mockValue}
    onChange={action('SongLyricsChange')}
  />
)
