import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components"
import BookmarkButton from "./bookmark-button"
import { FaGuitar } from 'react-icons/fa';

const SongLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.index.link};
`
SongLink.defaultProps = {
  theme: {
    index: {link: '#333'},
  }
}
const ChordsIcon = styled.span`
  font-size: 0.6em;
  padding-right: 1em;
  color: ${props => props.theme.song.chords};
`

const SongRow = ({ song }) => {
  const { id, title } = song;
  return (
    <li>
      <BookmarkButton songId={id} />
      <SongLink to={`/${id}`}>
        {title}
      </SongLink>
      {song.hasChords && (
        <ChordsIcon><FaGuitar /></ChordsIcon>
      )}
    </li>
  )
}

export default SongRow