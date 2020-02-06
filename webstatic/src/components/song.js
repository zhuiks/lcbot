import React from "react"

import Layout from "./layout"
import SEO from "./seo"
import SongText from "./song-text"

export const query = graphql`
  query($songId: ID!) {
    songList {
      song(id: $songId) {
        id
        title
        text
        links
      }
    }
  }
`

const SongPage = ({ data }) => {
  const song = data.songList.song
  return (
    <Layout isSongPage="1">
      <SEO title={song.title} description={song.text.reduce((acc, val) => acc +' '+ val)}/>
      <h1>{song.title}</h1>
      <SongText {...song} />
    </Layout>
  )
}

export default SongPage
