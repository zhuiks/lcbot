import React from 'react';
import styled from 'styled-components';

import { IChord } from '../../chords/chord';

interface ChordProps {
    readonly bgColor?: string;
    readonly paddingTop?: number;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${props => (props.paddingTop || 1).toString() + 'em'};
    background-color: ${props => props.bgColor || '#eee'};
    color: ${props => props.bgColor || '#ccc'};
    border-inline-start: 1px dashed #485ef7;
`;
const ChordHolder = styled.span`
    position: absolute;
    top: 0;
    font-weight: bold;
    color: red;
`;

export interface ChordSpanProps {
    chord: IChord;
    paddingTop?: number;
    children?: any;
}
const ChordSpan: React.FC<ChordSpanProps> = ({chord, paddingTop, children}) => {
    const text = (chord.text || children && children.toString() || '');
    return (
        <ChordContainer paddingTop={paddingTop}>
            <ChordHolder>{chord.root}{chord.type}</ChordHolder>
            {text}
        </ChordContainer>
    );
}

export default ChordSpan;