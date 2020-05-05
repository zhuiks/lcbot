import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import ChordsToolbar from "./chords-toolbar";
import { StateContext } from '../slide-reducer';
import { CHORDS_PADDING } from '../chord-container';

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
  readonly width?: number;
}
const Caret = styled.div<CaretProps>`
  position: absolute;
  height: 1em;
  width: ${props => props.width ? (Math.ceil(props.width)).toString() + 'px' : '0.8em'};
  top: 0;
  right: ${props => props.rtl ? (props.width ? '0' : 'auto') : '-0.3em'};
  left: ${props => props.rtl ? '0' : (props.width ? '0' : 'auto')};
  content: ' ';
  border: 1px dashed red;
  border-radius: 2px;
  background: rgba(255, 0, 0, 0.3);
  animation: ${blinkAnimation} 1.5s steps(5, start) infinite;
`;
interface CaretSpanProps {
  chordRef?: any;
}
const CaretSpan: React.FC<CaretSpanProps> = ({ chordRef }) => {

  const state = useContext(StateContext);

  if (!state) return null;
  const caretChord = state.slide.chords[state.caretLine][state.caretChordIndex];
  const chordSelected = caretChord.root !== '_' && state.caretChordOffset > 0 && state.caretChordOffset < 4;
  const chordWidth = chordSelected && chordRef && chordRef.current
    ? (chordRef.current as Element).getBoundingClientRect().width : 0;
  console.log(`Caret chordSelected=${chordSelected} chordWidth=${chordWidth}`);

  const pair = state.slide.chords[state.caretLine][state.caretChordIndex].text.slice(state.caretChordOffset - 1, state.caretChordOffset + 1);
  const addZWJ = arabicPairRegex.test(pair) ? ZWJ : '';

  const offsetText = state.slide.chords[state.caretLine][state.caretChordIndex].text.slice(0, state.caretChordOffset);

  // const prevChordsText = state.slide.chords[state.caretLine]
  //   .slice(0, state.caretChordIndex)
  //   .map(chord => chord.text)
  //   .reduce((str, chordText) => str + chordText, '');

  // console.log(`Caret Text: "${prevChordsText}"-"${offsetText}" ZWJ=${addZWJ !== ''}`)

  return (
    <ChordContainer>
      <Caret rtl={state.rtl} width={chordWidth} />
      {offsetText + addZWJ}
      <ChordsToolbar selectedChord={chordSelected && caretChord} />
    </ChordContainer>
  );
}

export default CaretSpan;