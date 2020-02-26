import React from 'react';
import styled from 'styled-components';
import ChordSpan from './chord-span';

const RTLdiv = styled.div`
  direction: rtl;
`;

export default {
  title: 'ChordSpan',
  component: ChordSpan,
};

export const Default = () => <ChordSpan chord="C#m">soome piece</ChordSpan>;

export const Arabic = () => (
  <RTLdiv>
    <ChordSpan chord="F#m">اهلا وسهلا</ChordSpan>;
  </RTLdiv>
);