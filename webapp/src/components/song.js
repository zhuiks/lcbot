import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "./layout"
import SEO from "./seo"
import SongSlide from "./song-slide"

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

const SongTitle = styled.h1`
  text-align: center;
`

const slides2text = slides => {
  let text = ''
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
  const youtubeLink = song.links && song.links[0]
  return (
    <Layout songText={descr} link={youtubeLink}>
      <SEO title={song.title} description={descr}/>
      <SongTitle>{song.title}</SongTitle>
      {song.slides.map(slide => (
        <SongSlide slide={slide} />
      ))}
    </Layout>
  )
}

export default SongPage
