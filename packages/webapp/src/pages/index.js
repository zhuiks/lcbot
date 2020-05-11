import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import bgImage from "../images/worship.jpg"

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
  }
`

const SearchWrapper = styled.div`
  height: 40vh;
  padding: 2em 2em 0.5em;
  position: relative;
  display: grid;
  align-items: center;
  &:before {
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
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

const SongList = styled.ul`
  list-style: none;
  margin: 1em;
`

const IndexPage = ({ data }) => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <SEO
        title="ترنيمات والكوردات"
        description="ابحث وشارك كلمات و كوردات الترانيم و التسبيح"
        keywords={[`ترنيم`, `كلمات`, `تسبيح`]}
      />
      <Layout dark>
        <div className="text-center">
          <SearchWrapper>
            <SearchField filter={filter} onChange={setFilter} />
          </SearchWrapper>
          <SongList className="song-list">
            {data.songList &&
              songFilter(data.songList.songs, filter).map(song => (
                <SongRow key={song.id} song={song} />
              ))}
          </SongList>
        </div>
      </Layout>
    </>
  )
}

export default IndexPage
