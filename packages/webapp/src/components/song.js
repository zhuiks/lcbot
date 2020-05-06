import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "./layout"
import SEO from "./seo"
import ChordToggle from "./atoms/chord-toggle"
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
          chords {
            text
            root
            quality
            type
            bass
          }
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
    if (text) {
      text += encodeURIComponent('\n')
    }
    text += encodeURIComponent('    ' + (slide.name || slide.type) + '\n')
    if (slide.lines && slide.lines.length) {
      text += slide.lines.reduce((acc, val) => acc + encodeURIComponent(val + '\n'))
    }
  })
  text += encodeURIComponent('\n')
  return text
}

const SongPage = ({ data, pageContext }) => {
  const song = data.songList.song
  const songBegining = song.slides.find(sl => sl.lines && sl.lines.length)
    .lines.map(line => line.replace(/\|:|:\|/g, ''))
    .join(' - ')
  const songInfo = {
    songId: song.id,
    text: slides2text(song.slides),
    youtube: song.links && song.links[0],
    pdf: pageContext.pdf,
  }
  const [showChords, toggleChords] = React.useState(false)

  return (
    <Layout songInfo={songInfo}>
      <SEO title={song.title} description={"كلمات ترنيمة" + ": " + songBegining} songId={song.id} />
      <SongTitle>{song.title}</SongTitle>
      <ChordToggle checked={showChords} onToggle={toggleChords} />
      {song.slides.map((slide, i) => {
        const displaySlide = slide.lines && slide.lines.length ? slide : song.slides.find(sl => sl.type === slide.type && sl.lines && sl.lines.length)
        return <SongSlide key={i} slide={displaySlide} displayChords={showChords} />
      })}
    </Layout>
  )
}

export default SongPage
