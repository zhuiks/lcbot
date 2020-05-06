import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components"

const SongLink = styled(Link)`
  text-decoration: none;
  color: #333;
`

const SongRow = ({ song }) => {
  const { id, title } = song;
  return (
    <li>
      <SongLink to={`/${id}`}>
        {title}
      </SongLink>
    </li>
  )
}

export default SongRow