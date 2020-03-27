import React from 'react';

import SongForm from '../organisms/song-form';
import generateKey from '../lib/generate-key';

const NewSong: React.FC = () => {
  const songId = generateKey('songId');

  return (
    <SongForm songData={{id: songId}} />
  );
};

export default NewSong;