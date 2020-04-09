import React from 'react'
import styled from 'styled-components'

import { CHORDS_PADDING } from './chords-line';

interface LineProps {
    readonly chordsPadding: boolean
}
const Line = styled.p<LineProps>`
  margin: 0;
  padding-top: ${props => (props.chordsPadding ? CHORDS_PADDING : 0).toString()}em;
  position: relative;
  `
const Repeat = styled.span`
    position: absolute;
    height: 100%;
    z-index: -1;
    width: 1.5em;
    color: #cccccc;
    font-size: 0.7em;
    line-height: 0.7em;
    top: 0;
    inset-block-start: 0;
    left: 0;
    inset-inline-end: 0;
    border-inline-start: 2px solid #cccccc;
    padding-inline-start: 5px;
    padding-block-start: 1em;
    padding-block-end: 3px;
    display: flex;
    align-items: flex-end;
  `
interface LyricsLineProps {
    text: string
    chordsPadding?: boolean
}

const LyricsLine: React.FC<LyricsLineProps> = ({ text, chordsPadding = false }) => (
    <Line chordsPadding={chordsPadding}>
        {text.replace(/\|:|:\|/g, '')}
        {text.indexOf(':|') !== -1 ? (
            <Repeat>2x</Repeat>
        ) : (text.indexOf('|:') !== -1 &&
            <Repeat />
            )}
    </Line>
)

export default LyricsLine
