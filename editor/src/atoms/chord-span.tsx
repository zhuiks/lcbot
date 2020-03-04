import React, { ReactHTML } from 'react';
import styled from 'styled-components';

interface ChordProps {
    readonly bgColor?: string;
    readonly paddingTop?: number;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${props => (props.paddingTop || 1).toString() + 'em'};
    background-color: ${props => props.bgColor || '#eee'};
    color: ${props => props.bgColor || '#ccc'};
`;
const ChordHolder = styled.span`
    position: absolute;
    top: 0;
    font-weight: bold;
    color: red;
`;

export interface Chord {
    rootNote: string;
    type?: string;
    optipon?: string;
    duration: number;
    text?: string;
}
export interface ChordSpanProps {
    chord: Chord;
    paddingTop?: number;
    children?: any;
}
const ChordSpan: React.FC<ChordSpanProps> = ({chord, paddingTop, children}) => {
    const text = (chord.text || children.toString() || '').padEnd(chord.duration);
    return (
        <ChordContainer paddingTop={paddingTop}>
            <ChordHolder>{chord.rootNote}{chord.type}</ChordHolder>
            {text}
        </ChordContainer>
    );
}

export default ChordSpan;