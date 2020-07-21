import React, {useContext} from "react"
import styled from "styled-components"
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BookmarkContext } from "./context-wrapper"

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  font-size: 0.6em;
  color: ${props => props.theme.footer.link};
  margin: 0;
  padding: 0 0 0 1em;
`

interface BookmarkButtonProps {
  songId: string
  bookmarkPage?: boolean
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({songId, bookmarkPage}) => {
  const {bookmarks, updateBookmarks} = useContext(BookmarkContext)
  const isBookmarked = bookmarks.includes(songId)
  return (
    <Button
      onClick={e => {
        e.preventDefault()
        updateBookmarks(songId)
      }}
    >
      {isBookmarked ? 
        bookmarkPage ? <AiOutlineCloseCircle/> : <BsBookmarkFill />
        : <BsBookmarkPlus />}
    </Button>
  )
}

export default BookmarkButton