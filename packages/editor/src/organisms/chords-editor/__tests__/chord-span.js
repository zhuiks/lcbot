import React from "react"
import renderer from "react-test-renderer"

import ChordSpan from "../chord-span"

describe("ChordSpan", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ChordSpan chord={mockChord} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

const mockChord = {
  root: 'C',
  text: 'Test string',
}
