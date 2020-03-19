import React from "react"
import renderer from "react-test-renderer"

import { SlideType } from '../../../types'
import ChordEditor from "../"
import ChordSlide from "../../../chords/chord-slide"

describe("ChordEditor", () => {
  it("renders correctly", () => {
    const slide = new ChordSlide(mockSlide);
    const tree = renderer
      .create(<ChordEditor slide={slide} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

const mockSlide = {
  type: SlideType.CHORUS,
  lines: [
      "Усі діла Твої звеличують Тебе",
      "Усе для Тебе і Тобою все живе!",
      "Усі ми створені в Тобі знайти усе",
      "Боже в Тобі усе!",
  ],
}
