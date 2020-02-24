import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components"

const SongLink = styled.a`
  text-decoration: none;
`

const SongRow = ({ song }) => {
  const { id, title } = song;
  return (
    <li>
      <Link to={`/${id}`}>
        <SongLink>{title}</SongLink>
      </Link>
    </li>
  )
}

export default SongRow