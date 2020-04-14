import React from "react"
import renderer from "react-test-renderer"

import { SlideType } from '@bit/zhuiks.lcbot.core.types'
import { ChordSlide } from '@bit/zhuiks.lcbot.core.chords'
import ChordEditor from "../"

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
