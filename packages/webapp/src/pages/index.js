import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

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
  height: 30vh;
  background: #888;
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
      <Layout>
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
