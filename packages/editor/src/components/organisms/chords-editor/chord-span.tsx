import React, { useRef } from 'react';
import styled from 'styled-components';

import { Chord } from '@bit/zhuiks.lcbot.core.chords';
import ChordContainer from './chord-container';
import CaretSpan from "./toolbar/caret-span";

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

export interface ChordSpanProps extends React.HTMLAttributes<HTMLDivElement> {
    chord: Chord;
    displayCaret?: boolean
}

const ChordSpan: React.FC<ChordSpanProps> = ({ chord, displayCaret = false, children, onKeyDown, onClick }) => {
    const chordRef = useRef(null);
    const text = (chord.text || (children && children.toString()) || '').replace(/^\s|\s$/g, '\u00a0');
    return (
        <ChordContainer onKeyDown={onKeyDown} onClick={(e) => {
            if (onClick) onClick(e)
        }}>
            {displayCaret && <CaretSpan chordRef={chordRef} />}
            <ChordHolder ref={chordRef}>
                {chord.root !== '_' && chord.root}
                {chord.quality === 'm' ? chord.quality : <ChordSub>{chord.quality}</ChordSub>}
                <ChordSup>{chord.type}</ChordSup>
            </ChordHolder>
            {text}
        </ChordContainer>
    );
}

export default ChordSpan;