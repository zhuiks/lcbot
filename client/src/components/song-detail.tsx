import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './song-row';

const SongDetail: React.FC<any> = ({ text }: any) => (
  <>
    {text.map( (line: String) => (
      <p>{line}</p>
    ))}
  </>
);

export default SongDetail;
