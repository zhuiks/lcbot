import React, { ReactHTML } from 'react';
import styled from 'styled-components';

interface ChordProps {
    readonly bgColor?: string;
    readonly paddingTop?: number;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${props => (props.paddingTop || 1).toString()+'em'};
    background-color: ${props => props.bgColor || '#eee'};
    color: ${props => props.bgColor || '#eee'};
`;
const ChordHolder = styled.span`
    position: absolute;
    top: 0;
    font-weight: bold;
    color: red;
`;
interface ChordSpanProps {
    chord: string;
    paddingTop?: number;
    children: any;
}
const ChordSpan: React.FC<ChordSpanProps> = ({ chord, paddingTop, children }) => (
    <ChordContainer paddingTop={paddingTop}>
        <ChordHolder>{chord}</ChordHolder>
        {children}
    </ChordContainer>
);

export default ChordSpan;