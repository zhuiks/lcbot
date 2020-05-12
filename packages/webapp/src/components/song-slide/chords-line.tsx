import React from 'react'
import styled from 'styled-components'
import { Chord } from '@bit/zhuiks.lcbot.core.chords';

export const CHORDS_PADDING = 1.1;

const CLine = styled.div`
    position: absolute;
    display: flex;
`;
interface ChordProps {
    readonly bgColor?: string;
    readonly paddingTop?: number;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${props => (props.paddingTop || 1).toString()}em;
    color: ${props => props.bgColor || '#fff'};
`;
const ChordHolder = styled.span`
    position: absolute;
    top: 0;
    /* font-weight: bold; */
    color: ${props => props.theme.song.chords};
    direction: LTR;
`;
ChordHolder.defaultProps = {
    theme: {
        song: { chords: 'red' }
    }
}
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

interface ChordsLineProps {
    chords?: Chord[]
}
const ChordsLine: React.FC<ChordsLineProps> = ({ chords }) => {
    if (!chords) return null;
    return (
        <CLine className="chords">
            {chords.map((chord: Chord, i: number) => (
                <ChordContainer key={i} paddingTop={CHORDS_PADDING}>
                    <ChordHolder>
                        {chord.root !== '_' && chord.root}
                        {chord.quality === 'm' ? chord.quality : <ChordSub>{chord.quality}</ChordSub>}
                        <ChordSup>{chord.type}</ChordSup>
                    </ChordHolder>
                    {chord.text}
                </ChordContainer>
            ))
            }
        </CLine>
    )
}
export default ChordsLine