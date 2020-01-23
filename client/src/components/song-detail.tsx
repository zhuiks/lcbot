import React from 'react';
import styled from 'react-emotion';

import { unit } from '../styles';
import { cardClassName, getBackgroundImage } from './song-row';

const SongDetail: React.FC<any> = ({ id, title }: any) => (
  <Card
    style={{
      backgroundImage: getBackgroundImage(id as string),
    }}
  >
    <h5>{title}</h5>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled('div')(cardClassName, {
  height: 365,
  marginBottom: unit * 4,
});

export default SongDetail;
