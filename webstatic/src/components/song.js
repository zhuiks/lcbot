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
  const descr = song.text.reduce((acc, val) => acc + encodeURIComponent(val+'\n'))
  return (
    <Layout isSongPage={descr}>
      <SEO title={song.title} description={descr}/>
      <h1>{song.title}</h1>
      <SongText {...song} />
    </Layout>
  )
}

export default SongPage
