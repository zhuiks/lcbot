import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { LinkContainer } from 'react-router-bootstrap';

export default ({ song }: any) => {
  const { id, title } = song;
  return (
    <LinkContainer to= {`/song/${id}`}>
      <ListGroup.Item action>{title}</ListGroup.Item>
    </LinkContainer>
  );
};
