import React from 'react';
import styled from 'styled-components';

import { Chord } from '@bit/zhuiks.lcbot.core.chords';

export const CHORDS_PADDING = 1.1;
interface ChordProps {
    readonly bgColor?: string;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${CHORDS_PADDING}em;
    background-color: ${props => props.bgColor || '#fff'};
    /* caret-color: #fff; */
    /* color: ${props => props.bgColor || '#fff'}; */
    /* border-inline-start: 1px dashed #485ef7; */
`;
const ChordHolder = styled.span`
    position: absolute;
    top: 0;
    /* font-weight: bold; */
    color: red;
    direction: LTR;
`;
const ChordSup = styled.sup`
    position: absolute;
    padding-inline-start: 2px;
    top: -5px;
`;
const ChordSub = styled.sub`
    position: absolute;
    padding-inline-start: 2px;
    bottom: -5px;
`;

export interface ChordSpanProps {
    chord: Chord;
    children?: any;
}

const ChordSpan: React.FC<ChordSpanProps> = ({ chord, children }) => {
    const text = (chord.text || (children && children.toString()) || '');
    return (
        <ChordContainer>
            <ChordHolder>
                {chord.root !== '_' && chord.root}
                {chord.quality === 'm' ? chord.quality : <ChordSub>{chord.quality}</ChordSub>}
                <ChordSup>{chord.type}</ChordSup>
            </ChordHolder>
            {text}
        </ChordContainer>
    );
}

export default ChordSpan;