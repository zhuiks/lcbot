import React, { useContext } from 'react';
import styled from 'styled-components';

import { getChordIndex } from '@bit/zhuiks.lcbot.core.chords';
import { DispatchContext, StateContext } from './slide-reducer';
import { CHORDS_PADDING } from './chord-container';

interface CaretProps {
  readonly line: number;
}
const ChordContainer = styled.div<CaretProps>`
  position: absolute;
  top: 0;/*${props => props.line * (CHORDS_PADDING + 1.43)}em;*/
  padding-top: ${CHORDS_PADDING}em;
  /*background-color: #fff;*/
  /* caret-color: #fff; */
  /* color: #fff; */
  border-inline-end: 1px dashed red;
`;

const CaretSpan: React.FC = () => {

  const state = useContext(StateContext);

  if (!state) return null;

  const caretText = state.slide.chords[state.caretLine]
    .slice(0, state.caretChordIndex - 1)
    .map(chord => chord.text)
    .reduce((str, chordText) => str + chordText, '')
    + state.slide.chords[state.caretLine][state.caretChordIndex].text.slice(0, state.caretChordOffset);

  return (
    <ChordContainer line={state.caretLine}>
      {caretText}
    </ChordContainer>
  );
}

export default CaretSpan;