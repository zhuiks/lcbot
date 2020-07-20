import React, { useContext } from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { BookmarkContext } from "../components/context-wrapper"
import BookmarkRow from "../components/bookmark-row"
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
        links
        hasChords
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
            <BookmarkRow key={song.id} song={song} />
          ))}
        </SongList>
      </Layout>
    </>
  )
}

export default SetPage