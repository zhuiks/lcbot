import React from 'react';
import { Link } from "gatsby"

const SongRow = ({ song }) => {
  const { id, title } = song;
  return (
    <li>
      <Link to={`/${id}`}>
        <a>{title}</a>
      </Link>
    </li>
  )
}

export default SongRow