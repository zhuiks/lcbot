import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Footer from "./footer"
import Bookmarks from "./bookmarks"
import useRtl from "../utils/use-rtl"

const Main = styled.main`
  min-height: 100vh;
  padding: 0 0 ${props => parseInt(props.footerHeight) + 1}px;
  direction: ${props => props.direction};
  background: ${props => props.theme.background};
`
Main.defaultProps = {
  theme: {
    background: '#fff',
  }
}

const Layout = ({ children, dark = false, info = false, bookmarksButton = true }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            footerHeight
          }
        }
      }
    `
  )
  const {direction} = useRtl()

  return (
    <>
      { bookmarksButton && <Bookmarks/> }
      <Main
        direction={direction}
        footerHeight={site.siteMetadata.footerHeight}
        dark={dark}
      >
        {children}
      </Main>
      {info && <Footer info={info} />}
    </>
  )
}

export default Layout
