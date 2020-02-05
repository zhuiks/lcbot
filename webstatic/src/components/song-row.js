import React from 'react';
import { Link } from "gatsby"
import ListGroup from 'react-bootstrap/ListGroup'

const SongRow = ({ song }) => {
  const { id, title } = song;
  return (
    <Link to= {`/song/${id}`}>
      <ListGroup.Item action>{title}</ListGroup.Item>
    </Link>
  )
}

export default SongRow