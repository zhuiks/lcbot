import React, { Fragment } from 'react';

const SongText: React.FC<any> = ({ text }: any) => (
  <Fragment>
    {text.map( (line: string) => (
      <p>{line}</p>
    ))}
  </Fragment>
);

export default SongText;
