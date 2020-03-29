import React from 'react';

import FormAdd from '../organisms/form-add';
import generateKey from '../lib/generate-key';

const NewSong: React.FC = () => {
  const songId = generateKey('songId');

  return (
    <FormAdd songData={{id: songId}} />
  );
};

export default NewSong;