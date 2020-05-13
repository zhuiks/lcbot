import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { FaWhatsapp, FaSearch, FaYoutube, FaFilePdf } from "react-icons/fa"

const FooterDiv = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: start;
  margin-top: -${props => props.footerHeight}px;
  height: ${props => props.footerHeight}px;
  width: 100%;
  border-top: ${props => props.theme.footer.borderTop};
  background: ${props => props.theme.footer.background};
  color: ${props => props.theme.footer.color};
  direction: ${props => props.direction};
  padding: 14px 1em 0;
  div {
    align-self: center;
    text-align: center;
    &.copyright {
      margin-inline-start: auto;
      font-size: 0.7em;
    }
    &.link a {
      color: ${props => props.theme.footer.link};
      margin-inline-end: 1em;
    }
  }
`
FooterDiv.defaultProps = {
  theme: {
    footer: {
      borderTop: '#888 1px solid',
      background: '#fff',
      color: '#888',
      link: '#000',
    }
  }
}
const Footer = ({ songInfo = false }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            url
            author
            direction
            footerHeight
          }
        }
      }
    `
  )

  const whatsappLink = songInfo ? `https://wa.me/?text=${songInfo.text}${site.siteMetadata.url}/${songInfo.songId}` : ''

  return (
    <FooterDiv
      direction={site.siteMetadata.direction}
      footerHeight={site.siteMetadata.footerHeight}
    >
      {songInfo &&
        <>
          <div className="link">
            <Link to="/"><FaSearch /></Link>
          </div>
          <div className="link">
            <a href={whatsappLink}><FaWhatsapp /></a>
          </div>
          {songInfo.youtube &&
            <div className="link">
              <a href={songInfo.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          }
          {songInfo.pdf &&
            <div className="link">
              <a href={songInfo.pdf} target="_blank" rel="noopener noreferrer"><FaFilePdf /></a>
            </div>
          }
        </>
      }
      <div className="copyright">
        © {new Date().getFullYear()} {/*data.site.siteMetadata.author*/}
      </div>
    </FooterDiv>
  )
}

export default Footer
