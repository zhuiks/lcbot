import React from 'react';
import stringGen from 'crypto-random-string';

import { SongForm } from '../components';

const NewSong: React.FC = () => {
  const songId = stringGen({ length: 5, type: 'url-safe' });

  return <SongForm songData={{id: songId}} />;
};

export default NewSong;