import React from 'react';
import styled from 'styled-components';
import ChordSpan, {Chord} from './chord-span';

export const MockRTLdiv = styled.div`
  direction: rtl;
`;

export default {
  title: 'Chords/Span',
  component: ChordSpan,
  excludeStories: /^mock.*/i,
};

const chord: Chord = {
  rootNote: 'C#',
  type: 'm',
  duration: 7,
}
export const Default = () => (
  <ChordSpan chord={chord}>soome piece</ChordSpan>
)

export const Arabic = () => (
  <MockRTLdiv>
    <ChordSpan chord={chord}>اهلا وسهلا</ChordSpan>
  </MockRTLdiv>
);