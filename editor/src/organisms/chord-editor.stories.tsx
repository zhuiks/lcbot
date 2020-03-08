import React from 'react';
import { action } from '@storybook/addon-actions';


import ChordEditor from './chord-editor';
import { SlideType } from '../__generated__/globalTypes';
import ChordSlide from '../molecules/chord-slide';

const mockSlide = new ChordSlide({
    type: SlideType.CHORUS,
    lines: [
        "Усі діла Твої звеличують Тебе",
        "Усе для Тебе і Тобою все живе!",
        "Усі ми створені в Тобі знайти усе",
        "Боже в Тобі усе!",
    ],
});

export default {
    title: 'Chords/The Editor',
    component: ChordEditor,
};


export const Default: React.FC = () => <ChordEditor slide={mockSlide}/>;

