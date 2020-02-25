import React from 'react';
import stringGen from 'crypto-random-string';

import SongForm from '../organisms/song-form';

const NewSong: React.FC = () => {
  const songId = stringGen({ length: 5, type: 'url-safe' });

  return <SongForm songData={{id: songId}} />;
};

export default NewSong;