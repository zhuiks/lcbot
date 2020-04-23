import React from 'react';
import styled from 'styled-components';

import { getChordIndex } from '@bit/zhuiks.lcbot.core.chords';
import { ChordsEditorState } from './slide-reducer';
import { CHORDS_PADDING } from './chord-span';

interface CaretProps {
  readonly line: number;
}
const ChordContainer = styled.div<CaretProps>`
  position: absolute;
  top: ${props => props.line* (CHORDS_PADDING + 1.43)}em;
  padding-top: ${CHORDS_PADDING}em;
  /*background-color: #fff;*/
  /* caret-color: #fff; */
  /* color: #fff; */
  border-inline-end: 1px dashed red;
`;

const CaretSpan: React.FC<ChordsEditorState> = ({ slide, line, pos }) => {
  const { chordIndex, charsFromTheEnd } = getChordIndex(slide, line, pos);
  const text = slide.chords[line]
    .slice(0, chordIndex - 1)
    .map(chord => chord.text)
    .reduce((str, chordText) => str + chordText, '')
    + slide.chords[line][chordIndex].text.slice(0, charsFromTheEnd);
  return (
    <ChordContainer line={line}>
      {text}
    </ChordContainer>
  );
}

export default CaretSpan;