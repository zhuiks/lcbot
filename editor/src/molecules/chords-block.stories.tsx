import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { convertFromRaw, EditorState, Editor } from 'draft-js';

import chordsBlockRenderer from './chords-block';

const mockChords = {
    randomIdC: {
        type: 'CHORD',
        mutability: 'IMMUTABLE',
        data: {
            chord: 'C'
        }
    },
    randomIdAm: {
        type: 'CHORD',
        mutability: 'IMMUTABLE',
        data: {
            chord: 'Am'
        }
    },
};

const mockContent = {
    blocks: [{
        text: "Я вільний! Любов'ю Ти вигнав страх мій",
        type: 'unstyled',
        entityRanges: [
            { offset: 0, length: 11, key: 'randomIdC' },
            { offset: 11, length: 17, key: 'randomIdAm' },
        ],
    }],
    entityMap: mockChords
};
const mockContentAr = {
    blocks: [{
        text: "انت تحبني رغم عيوبي وكل ضعفاتي",
        type: 'unstyled',
        entityRanges: [
            { offset: 0, length: 10, key: 'randomIdC' },
            { offset: 10, length: 10, key: 'randomIdAm' },
            { offset: 20, length: 5, key: 'randomIdC' },
        ],
    }],
    entityMap: mockChords
};

const RTLdiv = styled.div`
  direction: rtl;
`;


interface ChordEditorProps {
    rawContent: any
}

const ChordEditor: React.FC<ChordEditorProps> = ({ rawContent }) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(convertFromRaw(rawContent)),
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
    title: 'Chords Line',
    component: ChordEditor,
};

export const Default: React.FC = () => <ChordEditor rawContent={mockContent} />;

export const Arabic: React.FC = () => (
    <RTLdiv>
        <ChordEditor rawContent={mockContentAr} />
    </RTLdiv>
);
