/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import { Container, Row, Col } from "react-bootstrap"

const Layout = ({ children, searchLink = false }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <>
        <Container fluid className="px-0 main">
          <Row noGutters>
            <Col>
              <Container className="mt-5">
                <main>{children}</main>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-0">
          <Row noGutters>
            <Col className="footer-col">
              <footer>
                <span className="mr-auto">
                  {searchLink && 
                    <Link to="/">Search</Link>
                  }
                </span>
                <span>
                  © {data.site.siteMetadata.author} {new Date().getFullYear()}
                </span>
              </footer>
            </Col>
          </Row>
        </Container>
      </>
    )}
  />
)

export default Layout
