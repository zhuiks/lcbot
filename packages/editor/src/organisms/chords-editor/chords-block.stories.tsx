import React from 'react';
import { EditorState, Editor } from 'draft-js';

import chordsBlockRenderer from './chords-block';
import { MockRTLdiv } from './chord-span.stories';
import { ChordSlide } from '@bit/zhuiks.lcbot.core';
import { initChords } from './slide-actions';


export const mockContent = {
    lines: ["Я вільний! Любов'ю Ти вигнав страх мій"],
    chords: [[
        {
            root: 'C',
            text: "Я вільний! ",
        },
        {
            root: 'A',
            type: 'm',
            text: "Любов'ю Ти вигнав",
        }
    ]]
};
export const mockContentAr = {
    lines: ["انت تحبني رغم عيوبي وكل ضعفاتي"],
    chords: [[
        {
            root: 'C',
            text: "انت تحبني ",
        },
        {
            root: 'A',
            type: 'm',
            text: "رغم عيوبي وكل ضع",
        }
    ]]
};

interface ChordEditorProps {
    rawSlide: any
}

const ChordEditor: React.FC<ChordEditorProps> = ({ rawSlide }) => {
    const slide = new ChordSlide(rawSlide);
    const content = initChords(slide);

    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(content)
    );
    return (
        <Editor
            editorState={editorState}
            onChange={setEditorState}
            blockRendererFn={chordsBlockRenderer}
        />
    );
}

export default {
    title: 'Chords/Line',
    component: ChordEditor,
    excludeStories: /^mock.*/i,
};

export const Default: React.FC = () => <ChordEditor rawSlide={mockContent} />

export const Arabic: React.FC = () => (
    <MockRTLdiv>
        <ChordEditor rawSlide={mockContentAr} />
    </MockRTLdiv>
);
