import React, { ReactHTML } from 'react';
import styled from 'styled-components';

const ChordContainer = styled.div`
    position: relative;
    padding-top: 1em;
    background-color: #eee;
`;
const ChordHolder = styled.span`
    position: absolute;
    top: 0;
    font-weight: bold;
    color: red;
`;
interface ChordSpanProps {
    chord: string;
    children: any;
}
const ChordSpan: React.FC<ChordSpanProps> = ({ chord, children }) => (
    <ChordContainer>
        <ChordHolder>{chord}</ChordHolder>
        {children}
    </ChordContainer>
);

export default ChordSpan;