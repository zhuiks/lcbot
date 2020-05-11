import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Footer from "../components/footer"

const Main = styled.main`
  min-height: 100vh;
  padding: 0 0 ${props => props.footerHeight};
  direction: ${props =>props.direction};
`

const Layout = ({ children, songInfo = false }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            direction
            footerHeight
          }
        }
      }
    `
  )

  return (
    <>
      <Main direction={site.siteMetadata.direction} footerHeight={site.siteMetadata.footerHeight}>
        {children}
      </Main>
      <Footer songInfo={songInfo} />
    </>
  )
}

export default Layout
