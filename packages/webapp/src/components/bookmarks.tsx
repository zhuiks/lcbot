import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { BsBookmarksFill } from "react-icons/bs"
import { BookmarkContext } from "./context-wrapper"
import useRtl from "../utils/use-rtl"

const BookmarksLink = styled(Link)<{ isRtl: boolean }>`
  position: absolute;
  z-index: 10;
  top: 5px;
  color: #333;
  left: ${props => props.isRtl ? 'auto' : '1.7em'};
  right: ${props => props.isRtl ? '1.7em' : 'auto'};
`

const Bookmarks: React.FC = () => {
  const { bookmarks } = useContext(BookmarkContext)
  const {isRtl} = useRtl()
  if (bookmarks.length === 0) {
    return null
  }
  return (
    <BookmarksLink to="/s" isRtl={isRtl}>
      <BsBookmarksFill />
    </BookmarksLink>
  )
}

export default Bookmarks