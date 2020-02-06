import React from 'react';

const SongText = ({ text }) => (
  <>
    {text.map( line => (
      <p>{line}</p>
    ))}
  </>
);

export default SongText;
