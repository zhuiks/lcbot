import React, { Fragment } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SongText, PageHeader } from '.';

const SaveResult: React.FC<any> = ({ data }: any) => (
  <Fragment>
    <Alert variant={data.success ? "success" : "danger"}>
      <Alert.Heading>{data.success ? "Success" : "Error"}</Alert.Heading>
      {data.message}
    </Alert>
    <PageHeader link={ "/song/" + data.song.id }>{data.song.title}</PageHeader>
    <SongText text={data.song.text} />
  </Fragment>
);

export default SaveResult;
