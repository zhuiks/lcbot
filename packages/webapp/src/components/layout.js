import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Footer from "../components/footer"
import pattern from "../images/pattern.svg"

const Main = styled.main`
  min-height: 100vh;
  padding: 0 0 ${props => props.footerHeight};
  direction: ${props => props.direction};
  background: ${props => props.dark ? '#000' : 'url('+pattern+') repeat'}
`

const Layout = ({ children, dark = false, songInfo = false }) => {
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
      <Main
        direction={site.siteMetadata.direction}
        footerHeight={site.siteMetadata.footerHeight}
        dark={dark}
      >
        {children}
      </Main>
      <Footer songInfo={songInfo} />
    </>
  )
}

export default Layout
