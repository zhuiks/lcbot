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
        slides {
          type
          name
          lines
        }
        links
      }
    }
  }
`
const slides2text = slides => {
  let text = '';
  slides.forEach(slide => {
    if(text) {
      text += encodeURIComponent('\n')
    }
    text += encodeURIComponent('    ' + (slide.name || slide.type)+'\n')
    text += slide.lines.reduce((acc, val) => acc + encodeURIComponent(val+'\n'))
  })
  return text
}

const SongPage = ({ data }) => {
  const song = data.songList.song
  const descr = slides2text(song.slides)
  return (
    <Layout songText={descr}>
      <SEO title={song.title} description={descr}/>
      <h1>{song.title}</h1>
      <SongText {...song} />
    </Layout>
  )
}

export default SongPage
