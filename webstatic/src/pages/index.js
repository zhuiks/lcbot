import React, { useState } from "react"
import { graphql } from "gatsby"
import { Row, Col, Container, ListGroup } from "react-bootstrap"

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
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Song List" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <Container className="text-center">
        <Row className="justify-content-center my-3">
          <Col md="6">
            <SearchField filter={filter} onChange={setFilter} />
            <ListGroup variant="flush">
              {data.songList &&
                wordSearch(data.songList.songs, filter).map(song => (
                  <SongRow key={song.id} song={song} />
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
