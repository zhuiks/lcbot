import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import BookmarkButton from "./bookmark-button"
import { AiOutlineYoutube, AiOutlineFilePdf } from "react-icons/ai"
import FilePdfChords from './atoms/file-pdf-chords';

const SongLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.index.link};
`
SongLink.defaultProps = {
  theme: {
    index: { link: '#333' },
  }
}

const Button = styled.span`
padding: 0 0.3em;
&:first-child {
  padding-right: 1em;
}
a {
    font-size: 0.8em;
    color: ${props => props.theme.footer.link};
  }
`
const BookmarkRow = ({ song }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            url
          }
        }
      }
    `
  )
  const { id, title, links } = song
  const youtube = links && links[0]
  const pdf = `${site.siteMetadata.url}/print/${song.id}.pdf`
  const pdfChords = song.hasChords && `${site.siteMetadata.url}/print/${song.id}_chords.pdf`

  return (
    <li>
      <BookmarkButton songId={id} bookmarkPage />
      <SongLink to={`/${id}`}>
        {title}
      </SongLink>
      {youtube &&
        <Button>
          <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="Song example on Youtube"><AiOutlineYoutube /></a>
        </Button>
      }
      {pdf &&
        <Button>
          <a href={pdf} target="_blank" rel="noopener noreferrer" aria-label="Download PDF file with lyrics"><AiOutlineFilePdf /></a>
        </Button>
      }
      {pdfChords &&
        <Button>
          <a href={pdfChords} target="_blank" rel="noopener noreferrer" aria-label="Download PDF file with lyrics and chords"><FilePdfChords/></a>
        </Button>
      }
    </li>
  )
}

export default BookmarkRow