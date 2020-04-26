import React from 'react';
import styled from 'styled-components';
import ChordSpan from './chord-span';
import { Chord } from '@bit/zhuiks.lcbot.core.chords';
import { actions } from '@storybook/addon-actions';

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
  quality: 'm',
  text: 'La-lala-a-a',
});
const events = actions({ onClick: 'clicked', onKeyDown: 'keyDown' });

export const Default = () => (
  <ChordSpan chord={chord} {...events} />
)

export const Arabic = () => (
  <MockRTLdiv>
    <ChordSpan chord={new Chord({...chord, text: 'اهلا وسهلا'})}  {...events} />
  </MockRTLdiv>
);