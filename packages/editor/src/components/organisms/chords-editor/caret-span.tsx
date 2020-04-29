import React, { useContext, useEffect, useRef } from 'react';
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

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const caretRef = useRef(null);

  useEffect(() => {
    const caretEl = caretRef.current === null ? false : (caretRef.current as Element);
    if (!caretEl || !state || state.madeAdjustments > 35) return;
    console.log(`adjust caret pos: ${caretEl.getBoundingClientRect().width} -> ${state.lastClickX}`)
    const delta = state.lastClickX - caretEl.getBoundingClientRect().width;
    if (Math.abs(delta) < 7) return;
    dispatch({ type: 'ADJUST_POSITION', payload: Math.sign(delta) });
  });

  if (!state) return null;

  const caretText = state.slide.chords[state.caretLine]
    .slice(0, state.caretChordIndex - 1)
    .map(chord => chord.text)
    .reduce((str, chordText) => str + chordText, '')
    + state.slide.chords[state.caretLine][state.caretChordIndex].text.slice(0, state.caretChordOffset);

  return (
    <ChordContainer ref={caretRef} line={state.caretLine}>
      {caretText}
    </ChordContainer>
  );
}

export default CaretSpan;