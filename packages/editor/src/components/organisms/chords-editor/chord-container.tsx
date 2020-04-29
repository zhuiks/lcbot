import React from 'react';
import styled from 'styled-components';

export const CHORDS_PADDING = 1.1;

interface ChordProps {
    readonly bgColor?: string;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${CHORDS_PADDING}em;
    /*background-color: ${props => props.bgColor || '#fff'};*/
    /* caret-color: #fff; */
    /* color: ${props => props.bgColor || '#fff'}; */
    /* border-inline-start: 1px dashed #485ef7; */
`;

export default ChordContainer;