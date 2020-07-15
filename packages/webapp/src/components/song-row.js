import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components"
import BookmarkButton from "./bookmark-button"

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
      <BookmarkButton songId={id} />
      <SongLink to={`/${id}`}>
        {title}
      </SongLink>
    </li>
  )
}

export default SongRow