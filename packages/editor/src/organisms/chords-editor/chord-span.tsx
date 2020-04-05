import React from 'react';
import styled from 'styled-components';

import { Chord } from '@bit/zhuiks.lcbot.core';

interface ChordProps {
    readonly bgColor?: string;
    readonly paddingTop?: number;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${props => (props.paddingTop || 1).toString() + 'em'};
    background-color: ${props => props.bgColor || '#fff'};
    color: ${props => props.bgColor || '#fff'};
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
    paddingTop?: number;
    children?: any;
}

const ChordSpan: React.FC<ChordSpanProps> = ({ chord, paddingTop, children }) => {
    const text = (chord.text || (children && children.toString()) || '');
    return (
        <ChordContainer paddingTop={paddingTop}>
            <ChordHolder>
                {chord.root}
                {chord.quality === 'm' ? chord.quality : <ChordSub>{chord.quality}</ChordSub>}
                <ChordSup>{chord.type}</ChordSup>
            </ChordHolder>
            {text}
        </ChordContainer>
    );
}

export default ChordSpan;