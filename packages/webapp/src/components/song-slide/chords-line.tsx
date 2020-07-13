import React from 'react'
import styled from 'styled-components'
import { Chord } from '@bit/zhuiks.lcbot.core.chords';

const CHORDS_PADDING = 0.9;

const CLine = styled.div`
    position: relative;
    display: flex;
`;
interface ChordProps {
    readonly bgColor?: string;
}
const ChordContainer = styled.div<ChordProps>`
    position: relative;
    padding-top: ${CHORDS_PADDING}em;
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
    top: 8px;
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
                <ChordContainer key={i}>
                    <ChordHolder>
                        {chord.root !== '_' && chord.root}
                        {chord.quality === 'm' ? chord.quality : <ChordSub>{chord.quality}</ChordSub>}
                        <ChordSup>{chord.type}</ChordSup>
                    </ChordHolder>
                    {chord.text.replace(/^\s|\s$/g, '\u00a0')}
                </ChordContainer>
            ))
            }
        </CLine>
    )
}
export default ChordsLine