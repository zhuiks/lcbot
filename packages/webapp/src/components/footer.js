import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { FaWhatsapp } from "react-icons/fa"
import { AiOutlineSearch, AiOutlineYoutube, AiOutlineFilePdf } from "react-icons/ai"
import { useTranslation } from "react-i18next"

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
const Footer = ({ info = false }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            url
            author
            footerHeight
          }
        }
      }
    `
  )
  const { i18n: { language } } = useTranslation()
  const direction = ['ar'].includes(language) ? 'rtl' : 'lfr'

//  const whatsappLink = songInfo ? `https://wa.me/?text=${songInfo.text}${site.siteMetadata.url}/${songInfo.songId}` : ''
  const whatsappLink = info ? `https://wa.me/?text=${info.text}` : ''

  return (
    <FooterDiv
      direction={direction}
      footerHeight={site.siteMetadata.footerHeight}
    >
      {info &&
        <>
          <div className="link">
            <Link to="/"><AiOutlineSearch /></Link>
          </div>
          <div className="link">
            <a href={whatsappLink}><FaWhatsapp /></a>
          </div>
          {info.youtube &&
            <div className="link">
              <a href={info.youtube} target="_blank" rel="noopener noreferrer"><AiOutlineYoutube /></a>
            </div>
          }
          {info.pdf && info.pdf !== "" &&
            <div className="link">
              <a href={info.pdf} target="_blank" rel="noopener noreferrer"><AiOutlineFilePdf /></a>
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
