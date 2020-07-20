import React, { useContext } from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { BookmarkContext } from "../components/context-wrapper"
import { AiOutlineSearch, AiOutlineYoutube, AiOutlineFilePdf, AiOutlineClose } from "react-icons/ai"

import SongRow from "../components/song-row"
import { getBLink } from "../utils/id-compress"

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const Button = styled.button`
  
`

const SongList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 2em 2.1em;
`

export const query = graphql`
  query {
    songList {
      songs{
        id
        title
      }
    }
    site {
      siteMetadata {
        url
      }
    }
  }
`

const SetPage = ({ data, location }) => {
  const { bookmarks } = useContext(BookmarkContext)
  const songs = bookmarks.map(songId => data.songList && data.songList.songs.find(song => song.id === songId))
  const bookmarksInfo = {
    text: `${data.site.siteMetadata.url}/${getBLink(bookmarks)}`
  }

  return (
    <>
      <SEO />
      <Layout info={bookmarksInfo} bookmarksButton={false}>
        <SongList>
          {songs && songs.map(song => (
            <SongRow key={song.id} song={song} />
          ))}
        </SongList>
      </Layout>
    </>
  )
}

export default SetPage