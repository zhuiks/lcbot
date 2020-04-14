import React from 'react';

import FormAdd from '../components/organisms/form-add';
import generateKey from '../utils/generate-key';

const NewSong: React.FC = () => {
  const songId = generateKey('songId');

  return (
    <FormAdd songId={songId} />
  );
};

export default NewSong;