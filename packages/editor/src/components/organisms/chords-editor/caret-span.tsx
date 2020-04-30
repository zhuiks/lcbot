import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import ChordsToolbar from "./chords-toolbar";
import { StateContext } from './slide-reducer';
import { CHORDS_PADDING } from './chord-container';

// https://www.w3.org/TR/2018/WD-alreq-20180222/#dfn-zwj
const ZWJ = '\u200D';
const arabicPairRegex = /^[\u0620-\u064A]{2}$/;

interface CaretContainerProps {
  readonly line?: number;
}
const ChordContainer = styled.div<CaretContainerProps>`
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
    background: rgba(255, 0, 0, 0.1);
  }
`;

interface CaretProps {
  readonly rtl?: boolean;
}
const Caret = styled.div<CaretProps>`
  position: absolute;
  height: 1em;
  width: 0.8em;
  top: 0;
  right: ${props => props.rtl ? 'auto' : '-0.3em'};
  left: ${props => props.rtl ? '0' : 'auto'};
  content: ' ';
  border: 1px dashed red;
  border-radius: 2px;
  background: rgba(255, 0, 0, 0.3);
  animation: ${blinkAnimation} 1.5s steps(5, start) infinite;
`;

const CaretSpan: React.FC = () => {

  const state = useContext(StateContext);

  if (!state) return null;

  const pair = state.slide.chords[state.caretLine][state.caretChordIndex].text.slice(state.caretChordOffset-1, state.caretChordOffset + 1);
  const addZWJ = arabicPairRegex.test(pair) ? ZWJ : '';
  console.log(`caret pair "${pair}" ZWJ=${addZWJ!==''}`)

  const caretText = state.slide.chords[state.caretLine]
    .slice(0, state.caretChordIndex - 1)
    .map(chord => chord.text)
    .reduce((str, chordText) => str + chordText, '')
    + state.slide.chords[state.caretLine][state.caretChordIndex].text.slice(0, state.caretChordOffset) + addZWJ;

  return (
    <ChordContainer>
      <Caret rtl={state.rtl} />
      {caretText}
      <ChordsToolbar />
    </ChordContainer>
  );
}

export default CaretSpan;