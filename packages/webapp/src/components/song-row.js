import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components"

const SongLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.index.link};
`
SongLink.defaultProps = {
  theme: {
    index: {link: '#333'},
  }
}

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