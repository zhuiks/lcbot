import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { FaWhatsapp, FaSearch, FaYoutube } from "react-icons/fa"

const direction = 'rtl'
const footerHeight = '50px'

const Main = styled.main`
  min-height: 100vh;
  padding: 40px 1em ${footerHeight};
  direction: ${direction};
  article {
    margin-bottom: 2em;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: start;
  margin-top: -${footerHeight};
  height: ${footerHeight};
  width: 100%;
  border-top: #888 1px solid;
  color: #888;
  direction: ${direction};
  padding-inline: 1em;
  div {
    align-self: center;
    text-align: center;
    &.copyright {
      margin-inline-start: auto;
      font-size: 0.7em;
    }
    &.link a {
      color: #000000;
      margin-inline-end: 1em;
      svg {
        margin-top: 0.5em;
      }
    }
  }
`

const Layout = ({ children, songText = false, link }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `
  )

  const whatsappLink = `https://wa.me/?text=${songText}`

  return (
    <>
      <Main>
        {songText ?
          <article>{children}</article>
          :
          <div>{children}</div>
        }
      </Main>
      <Footer>
        {songText &&
          <>
            <div className="link">
              <Link to="/"><FaSearch /></Link>
            </div>
            <div className="link">
              <a href={whatsappLink}><FaWhatsapp /></a>
            </div>
            {link &&
              <div className="link">
                <a href={link} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              </div>
            }
          </>
        }
        <div className="copyright">
          © {new Date().getFullYear()} {/*data.site.siteMetadata.author*/}
        </div>
      </Footer>
    </>
  )
}

export default Layout
