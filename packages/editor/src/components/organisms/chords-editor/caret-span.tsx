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
interface CaretSpanProps {
  line: number;
  text: string;
  ref?: any;
}
const CaretSpan: React.FC<CaretSpanProps> = ({ line, text, ref }) => {
  return (
    <ChordContainer ref={ref} line={line}>
      {text}
    </ChordContainer>
  );
}

export default CaretSpan;