import React from 'react';
import styled from 'styled-components';
import ChordSpan from './chord-span';

export const MockRTLdiv = styled.div`
  direction: rtl;
`;

export default {
  title: 'Chords/Span',
  component: ChordSpan,
  excludeStories: /^mock.*/i,
};

export const Default = () => <ChordSpan chord="C#m">soome piece</ChordSpan>

export const Arabic = () => (
  <MockRTLdiv>
    <ChordSpan chord="F#m">اهلا وسهلا</ChordSpan>
  </MockRTLdiv>
);