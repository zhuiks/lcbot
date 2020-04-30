import React from 'react';
import { EditorState, Editor } from 'draft-js';

import ChordsBlock from './chords-block';
import { MockRTLdiv } from './chord-span.stories';
import { ChordSlide, Chord } from '@bit/zhuiks.lcbot.core.chords';
import { initChords } from './slide-actions';


export const mockContent = [
    new Chord({
        root: 'C',
        text: "Я вільний! ",
    }),
    new Chord({
        root: 'A',
        type: 'm',
        text: "Любов'ю Ти вигнав",
    }),
];
export const mockContentAr = [
    new Chord({
        root: 'C',
        text: "انت تحبني ",
    }),
    new Chord({
        root: 'A',
        type: 'm',
        text: "رغم عيوبي وكل ضع",
    }),
];

export default {
    title: 'Chords/Line',
    component: ChordsBlock,
    excludeStories: /^mock.*/i,
};

export const Default: React.FC = () => <ChordsBlock line={0} chords={mockContent} />

export const Arabic: React.FC = () => (
    <MockRTLdiv>
        <ChordsBlock line={0} chords={mockContentAr} />
    </MockRTLdiv>
);
