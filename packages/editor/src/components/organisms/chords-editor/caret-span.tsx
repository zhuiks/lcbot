import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import ChordsToolbar from "./chords-toolbar";
import { StateContext } from './slide-reducer';
import { CHORDS_PADDING } from './chord-container';

interface CaretProps {
  readonly line?: number;
}
const ChordContainer = styled.div<CaretProps>`
  position: absolute;
  top: 0;/*props => props.line * (CHORDS_PADDING + 1.43)}em;*/
  padding-top: ${CHORDS_PADDING}em;
  /*background-color: #fff;*/
  /* caret-color: #fff; */
  /* color: #fff; */
  /*border-inline-end: 1px dashed red; */
`;
const blinkAnimation = keyframes`
  to {
    background: transparent;
  }
`;

const Caret = styled.div`
  position: absolute;
  height: 1em;
  width: 0.8em;
  top: 0;
  right: -0.3em;
  content: ' ';
  border: 1px dashed red;
  border-radius: 2px;
  background: rgba(255, 0, 0, 0.3);
  animation: ${blinkAnimation} 1s steps(5, start) infinite;
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
    <ChordContainer>
      <Caret />
      {caretText}
      <ChordsToolbar />
    </ChordContainer>
  );
}

export default CaretSpan;