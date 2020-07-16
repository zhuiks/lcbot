import React, {useContext} from "react"
import styled from "styled-components"
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs"
import { BookmarkContext } from "./context-wrapper"

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  font-size: 0.6em;
  color: #aaa;
  margin: 0;
  padding: 0 0 0 1em;
`

interface BookmarkButtonProps {
  songId: string
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({songId}) => {
  const {bookmarks, updateBookmarks} = useContext(BookmarkContext)
  const isBookmarked = bookmarks.includes(songId)
  return (
    <Button
      onClick={e => {
        e.preventDefault()
        updateBookmarks(songId)
      }}
    >
      {isBookmarked ? <BsBookmarkFill /> : <BsBookmarkPlus />}
    </Button>
  )
}

export default BookmarkButton