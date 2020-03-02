import React from 'react';
import { action } from '@storybook/addon-actions';

import ChordEditor from './chord-editor';
import { SlideInput, SlideType } from '../__generated__/globalTypes';

export default {
    title: 'Chords/The Editor',
    component: ChordEditor,
};

const slideMock: SlideInput = {
    type: SlideType.VERSE,
    name: '2',
    lines: [
        'line 1 line 1 line 1',
        'line 2 line 2',
    ]
};

export const Default: React.FC = () => <ChordEditor slide={slideMock}/>;

