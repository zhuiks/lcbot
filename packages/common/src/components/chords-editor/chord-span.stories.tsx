import React from 'react';
import styled from 'styled-components';
import ChordSpan from './chord-span';
import Chord from '../../chords/chord';

export const MockRTLdiv = styled.div`
  direction: rtl;
`;

export default {
  title: 'Chords/Span',
  component: ChordSpan,
  excludeStories: /^mock.*/i,
};

const chord = new Chord({
  root: 'C#',
  type: 'm',
  text: 'La-lala-a-a',
});
export const Default = () => (
  <ChordSpan chord={chord} />
)

export const Arabic = () => (
  <MockRTLdiv>
    <ChordSpan chord={chord.merge({text: 'اهلا وسهلا'})} />
  </MockRTLdiv>
);