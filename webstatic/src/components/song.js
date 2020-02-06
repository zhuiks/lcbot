import React from "react"
import { Link } from "gatsby"

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
    <Layout pageInfo={{ pageName: song.title }}>
      <SEO title={song.title} />
      <h1>{song.title}</h1>
      <SongText {...song} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SongPage
