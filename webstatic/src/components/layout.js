/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import { Container, Row, Col } from "react-bootstrap"

const Layout = ({ children, isSongPage = false }) => (
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
        <Container fluid className={"main" + (isSongPage ? " song" : "")}>
          <main>{children}</main>
        </Container>
        <footer>
          <div>
            {isSongPage &&
              <Link to="/">Search</Link>
            }
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} {/*data.site.siteMetadata.author*/}
          </div>
        </footer>
      </>
    )}
  />
)

export default Layout
