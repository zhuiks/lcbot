import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchField from "../components/search"
import SongRow from "../components/song-row"
import { wordSearch } from "../utils"

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

const IndexPage = ({ data }) => {
  const [filter, setFilter] = useState("");

  return (
    <Layout>
      <SEO title="Song List" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <div className="text-center">
            <SearchField filter={filter} onChange={setFilter} />
            <ul className="song-list">
              {data.songList &&
                wordSearch(data.songList.songs, filter).map(song => (
                  <SongRow key={song.id} song={song} />
                ))}
            </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
