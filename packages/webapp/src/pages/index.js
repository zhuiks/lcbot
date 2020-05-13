import React, { useState } from "react"
import { graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import themes from "../themes"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchField from "../components/search"
import SongRow from "../components/song-row"
import songFilter from "../components/song-filter"

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
        theme
      }
    }
  }
`

const SearchWrapper = styled.div`
  transition: height 4s easyInOut;
  height: ${props => props.active ? 'auto' : '40vh'};
  padding: ${props => props.active ? '10px 0.7em' : '2em 2em 0.5em'};
  position: relative;
  display: grid;
  align-items: center;
  &:before {
    background: ${props => props.theme.index.searchBackground};
    background-size: cover;
    background-origin: border-box;
    filter: blur(2px);
    content: ' ';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`
SearchWrapper.defaultProps = {
  theme: {
    index: {
      searchBackground: '#fff',
    }
  }
}

const SongList = styled.ul`
  list-style: none;
  margin: 1em 2.1em;
`

const IndexPage = ({ data }) => {
  const [filter, setFilter] = useState("");
  const [searchActive, setActive] = useState(false)
  const currentTheme = data.site.siteMetadata.theme || 'default'

  const songs = data.songList && data.songList.songs.sort((a, b) => {
    if (!(a && a.title) && !(b && b.title)) return 0;
    if (!(b && b.title)) return 1;
    if (!(a && a.title)) return -1;
    return a.title.localeCompare(b.title, 'ar', { sensitivity: 'base' })
  });

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <SEO
        title="ترانيم والكوردات"
        description="ابحث وشارك كلمات و كوردات الترانيم و التسبيح"
        keywords={[`ترنيم`, `كلمات`, `تسبيح`]}
      />
      <Layout>
        <div className="text-center">
          <SearchWrapper active={searchActive}>
            <SearchField
              filter={filter}
              active={searchActive}
              onChange={setFilter}
              onFocus={() => setActive(true)}
              onBlur={() => { if (filter.trim() === "") setActive(false) }}
            />
          </SearchWrapper>
          <SongList className="song-list">
            {songs &&
              songFilter(songs, filter).map(song => (
                <SongRow key={song.id} song={song} />
              ))}
          </SongList>
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
