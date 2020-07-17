import React, { useContext } from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { BookmarkContext } from "../components/context-wrapper"
import SongRow from "../components/song-row"

const SongList = styled.ul`
  list-style: none;
  margin: 1em 2.1em;
`

export const query = graphql`
  query {
    songList {
      songs{
        id
        title
      }
    }
  }
`

const SetPage = ({ data }) => {
  const { bookmarks } = useContext(BookmarkContext)
  console.log(bookmarks)
  const songs = bookmarks.map(songId => data.songList && data.songList.songs.find(song => song.id === songId))
  console.log(songs)
  return (
    <>
      <SEO />
      <Layout>
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