import React from "react"
import renderer from "react-test-renderer"

import SongRow from "../song-row"

describe("SongRow", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SongRow song={mockSong} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

const mockSong = {
  id: 'test-id',
  title: 'Test Song Title'
}
